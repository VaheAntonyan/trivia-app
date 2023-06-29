import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './components/quiz/quiz.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_SELECT_CONFIG, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {ScoreBoardTableComponent} from './components/quiz/score-board/score-board-table/score-board-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { QuizHomeComponent } from './components/quiz/quiz-home/quiz-home.component';
import { QuizGameComponent } from './components/quiz/quiz-game/quiz-game.component';
import { QuizThankYouComponent } from './components/quiz/quiz-thank-you/quiz-thank-you.component';
import { ScoreBoardComponent } from './components/quiz/score-board/score-board.component';

@NgModule({
  declarations: [
    QuizComponent,
    ScoreBoardTableComponent,
    QuizHomeComponent,
    QuizGameComponent,
    QuizThankYouComponent,
    ScoreBoardComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    MatSelect,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' }
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        hideSingleSelectionIndicator: true,
      }
    }

  ]
})
export class QuizModule { }
