import {Component, Inject, OnInit} from '@angular/core';
import {QuizService, ScoreRecord, ScreenName} from "../../services/quiz.service";
import {map, Observable} from "rxjs";
import {FrontendQuestion} from "../../models/question.model";

interface CategoryInterface {
  value: number;
  name: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  categories: CategoryInterface[] = [
    {"value": 9, "name": "General Knowledge"},
    {"value": 10, "name": "Entertainment: Books"},
    {"value": 11, "name": "Entertainment: Film"},
    {"value": 12, "name": "Entertainment: Music"},
    {"value": 13, "name": "Entertainment: Musicals & Theatres"},
    {"value": 14, "name": "Entertainment: Television"},
    {"value": 15, "name": "Entertainment: Video Games"},
    {"value": 16, "name": "Entertainment: Board Games"},
    {"value": 17, "name": "Science & Nature"},
    {"value": 18, "name": "Science: Computers"},
    {"value": 19, "name": "Science: Mathematics"},
    {"value": 20, "name": "Mythology"},
    {"value": 21, "name": "Sports"},
    {"value": 22, "name": "Geography"},
    {"value": 23, "name": "History"},
    {"value": 24, "name": "Politics"},
    {"value": 25, "name": "Art"},
    {"value": 26, "name": "Celebrities"},
    {"value": 27, "name": "Animals"},
    {"value": 28, "name": "Vehicles"},
    {"value": 29, "name": "Entertainment: Comics"},
    {"value": 30, "name": "Science: Gadgets"},
    {"value": 31, "name": "Entertainment: Japanese Anime & Manga"},
    {"value": 32, "name": "Entertainment: Cartoon & Animations"},
  ].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  difficultyBackgroundColor: Record<FrontendQuestion["difficulty"], string> = {
    'Easy': "#42A976",
    'Medium': "#EAC505",
    'Hard': "#EF7D54",
  }

  questionCount: number = 10;

  selectedCategoryValue: number | null = null;
  currentQuestion$!: Observable<FrontendQuestion>;
  correctAnswerCount$!: Observable<number>;
  currentQuestionIndex$!: Observable<number>;
  screenName$!: Observable<ScreenName>;
  quizScoreRecords!: ScoreRecord[];

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
    this.quizScoreRecords = JSON.parse(localStorage.getItem('quizScoreBoard') || '[]');
    this.quizService.showScreen('score-board');
  }
}
