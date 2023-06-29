import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {QuizStateService} from "../../../services/quiz-state.service";

@Component({
  selector: 'app-quiz-thank-you',
  templateUrl: './quiz-thank-you.component.html',
  styleUrls: ['./quiz-thank-you.component.scss']
})
export class QuizThankYouComponent {

  correctAnswerCount$: Observable<number>;
  questionCount: number = 10;

  constructor(private quizStateService: QuizStateService) {
    this.correctAnswerCount$ = this.quizStateService.correctAnswerCount$;
  }

  restart() {
    this.quizStateService.restart();
  }
}
