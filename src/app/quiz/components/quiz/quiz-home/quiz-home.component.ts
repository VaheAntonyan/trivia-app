import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../shared/types/interfaces/category.interface";
import {QuizHttpService} from "../../../services/quiz-http.service";
import {QuizStateService} from "../../../services/quiz-state.service";

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.scss']
})
export class QuizHomeComponent implements OnInit {

  categories$!: Observable<Category[]>;
  selectedCategoryValue: number | null = null;

  constructor(private quizService: QuizHttpService,
              private quizStateService: QuizStateService) {
  }

  ngOnInit() {
    this.categories$ = this.quizService.loadCategories();
  }

  start() {
    this.quizService.loadQuestions(this.selectedCategoryValue!);
    this.selectedCategoryValue = null;

    this.showQuizScreen();
  }

  showQuizScreen() {
    this.quizStateService.showScreen('game');
  }

  showScoreBoard() {
    this.quizStateService.showScreen('score-board');
  }
}
