import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ScreenName} from "../../shared/types/types/screen-name.type";
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

  screenName$!: Observable<ScreenName>;

  constructor(private quizStateService: QuizStateService) {
  }

  ngOnInit() {
    this.screenName$ = this.quizStateService.screenName$;
  }
}
