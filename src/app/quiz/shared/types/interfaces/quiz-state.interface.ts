import {Question} from "./question.interface";
import {ScreenName} from "../types/screen-name.type";

export interface QuizState {
  questions: Question[]
  currentQuestionIndex: number,
  correctAnswerCount: number,
  answers: string[],
  screenName: ScreenName,
}
