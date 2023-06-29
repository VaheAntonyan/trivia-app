import {Component, OnInit} from '@angular/core';
import {QuizHttpService} from "../../services/quiz-http.service";
import {Observable} from "rxjs";
import {Question} from "../../shared/types/interfaces/question.interface";
import {ScreenName} from "../../shared/types/types/screen-name.type";
import {Category} from "../../shared/types/interfaces/category.interface";
import {enterAnimation} from "../../shared/animations/enter.animation";
import {leaveAnimation} from "../../shared/animations/leave.animation";
import {QuizStateService} from "../../services/quiz-state.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    enterAnimation,
    leaveAnimation,
  ]
})
export class QuizComponent implements OnInit {

  difficultyBackgroundColor: Record<Question["difficulty"], string> = {
    'Easy': "#42A976",
    'Medium': "#EAC505",
    'Hard': "#EF7D54",
  }
  questionCount: number = 10;
  selectedCategoryValue: number | null = null;

  currentQuestion$!: Observable<Question>;
  categories$!: Observable<Category[]>;
  currentQuestionIndex$!: Observable<number>;
  correctAnswerCount$!: Observable<number>;
  screenName$!: Observable<ScreenName>;

  ngOnInit() {
    this.currentQuestion$ = this.quizStateService.currentQuestion$;
    this.categories$ = this.quizStateService.categories$;
    this.currentQuestionIndex$ = this.quizStateService.currentQuestionIndex$;
    this.correctAnswerCount$ = this.quizStateService.correctAnswerCount$;
    this.screenName$ = this.quizStateService.screenName$;

    this.quizService.loadCategories();
  }

  constructor(private quizService: QuizHttpService,
              private quizStateService: QuizStateService) {
  }

  start() {
    this.quizService.loadQuestions(this.selectedCategoryValue!);
    this.selectedCategoryValue = null;

    this.showQuizScreen();
  }

  handleAnswer(answer: string) {
    this.quizStateService.checkAnswer(answer);

    this.quizStateService.nextQuestion();
  }

  restart() {
    this.quizStateService.restart();
  }

  showQuizScreen() {
    this.quizStateService.showScreen('quiz');
  }

  showScoreBoard() {
    this.quizStateService.showScreen('score-board');
  }
}
