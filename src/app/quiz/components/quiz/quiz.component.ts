import {Component} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {Observable} from "rxjs";
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
export class QuizComponent {
  categories: CategoryInterface[] = [
    {"value": 9, "name": "Entertainment: Books"},
    {"value": 10, "name": "Entertainment: Film"},
    {"value": 11, "name": "Entertainment: Music"},
    {"value": 12, "name": "Entertainment: Musicals & Theatres"},
    {"value": 13, "name": "Entertainment: Television"},
    {"value": 14, "name": "Entertainment: Video Games"},
    {"value": 15, "name": "Entertainment: Board Games"},
    {"value": 16, "name": "Science & Nature"},
    {"value": 17, "name": "Science: Computers"},
    {"value": 18, "name": "Science: Mathematics"},
    {"value": 19, "name": "Mythology"},
    {"value": 20, "name": "Sports"},
    {"value": 21, "name": "Geography"},
    {"value": 22, "name": "History"},
    {"value": 23, "name": "Politics"},
    {"value": 24, "name": "Art"},
    {"value": 25, "name": "Celebrities"},
    {"value": 26, "name": "Animals"},
    {"value": 27, "name": "Vehicles"},
    {"value": 28, "name": "Entertainment: Comics"},
    {"value": 29, "name": "Science: Gadgets"},
    {"value": 30, "name": "Entertainment: Japanese Anime & Manga"},
    {"value": 31, "name": "Entertainment: Cartoon & Animations"},
  ].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  selectedCategoryValue: number | null = null;
  questions$!: Observable<FrontendQuestion[]>;
  showStartScreen: boolean = true;
  showQuizScreen: boolean = false;

  constructor(private quizService: QuizService) {
  }

  start() {
    this.questions$ = this.quizService.loadQuestions(this.selectedCategoryValue!);
    this.showStartScreen = false;
    this.showQuizScreen = true;
  }
}
