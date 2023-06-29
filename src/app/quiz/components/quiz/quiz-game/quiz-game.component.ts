import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Question} from "../../../shared/types/interfaces/question.interface";
import {QuizStateService} from "../../../services/quiz-state.service";

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent {

  currentQuestion$: Observable<Question>;
  currentQuestionIndex$: Observable<number>;

  difficultyBackgroundColor: Record<Question["difficulty"], string> = {
    'Easy': "#42A976",
    'Medium': "#EAC505",
    'Hard': "#EF7D54",
  }

  constructor(private quizStateService: QuizStateService) {
    this.currentQuestion$ = this.quizStateService.currentQuestion$;
    this.currentQuestionIndex$ = this.quizStateService.currentQuestionIndex$;
  }

  handleAnswer(answer: string) {
    this.quizStateService.checkAnswer(answer);

    this.quizStateService.nextQuestion();
  }
}
