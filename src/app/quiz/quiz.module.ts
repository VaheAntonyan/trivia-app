import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './components/quiz/quiz.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
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
  providers: [QuizService]
})
export class QuizModule { }
