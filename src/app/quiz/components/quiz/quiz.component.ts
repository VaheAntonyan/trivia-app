import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {map, Observable} from "rxjs";
import {Question} from "../../shared/types/interfaces/question.interface";
import {ScreenName} from "../../shared/types/types/screen-name.type";
import {Category} from "../../shared/types/interfaces/category.interface";
import {enterAnimation} from "../../shared/animations/enter.animation";
import {leaveAnimation} from "../../shared/animations/leave.animation";

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
  correctAnswerCount$!: Observable<number>;
  currentQuestionIndex$!: Observable<number>;
  screenName$!: Observable<ScreenName>;
  categories$!: Observable<Category[]>;

  ngOnInit() {
    this.currentQuestionIndex$ = this.quizService.state$
      .pipe(
        map(state => state.currentQuestionIndex + 1)
      )
    this.screenName$ = this.quizService.state$
      .pipe(
        map(state => state.screenName)
      )
    this.correctAnswerCount$ = this.quizService.state$
      .pipe(
        map(state => state.correctAnswerCount)
      )
    this.currentQuestion$ = this.quizService.state$
      .pipe(
        map(state => state.questions[state.currentQuestionIndex])
      )
    this.categories$ = this.quizService.state$
      .pipe(
        map(state => state.categories)
      )

    this.quizService.loadCategories();
  }

  constructor(private quizService: QuizService) {
  }

  start() {
    this.quizService.loadQuestions(this.selectedCategoryValue!);
    this.selectedCategoryValue = null;

    this.showQuizScreen();
  }

  handleAnswer(answer: string) {
    this.quizService.checkAnswer(answer);

    this.nextQuestion();
  }

  nextQuestion() {
    this.quizService.nextQuestion();
  }

  restart() {
    this.quizService.restart();
  }

  showQuizScreen() {
    this.quizService.showScreen('quiz');
  }

  showScoreBoard() {
    this.quizService.showScreen('score-board');
  }
}
