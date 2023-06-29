import {Component, Input} from '@angular/core';
import {QuizStateService} from "../../../services/quiz-state.service";

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent {

  constructor(private quizStateService: QuizStateService) {
  }

  restart() {
    this.quizStateService.restart();
  }
}
