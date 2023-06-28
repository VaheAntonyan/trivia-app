import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './components/quiz/quiz.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_SELECT_CONFIG, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {QuizService} from "./services/quiz.service";

@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    QuizService,
    MatSelect,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' }
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        overlayPanelClass: 'customPanelClass',
        hideSingleSelectionIndicator: true,
      }
    }

  ]
})
export class QuizModule { }
