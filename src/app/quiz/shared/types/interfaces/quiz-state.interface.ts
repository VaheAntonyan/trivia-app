import {Question} from "./question.interface";
import {ScreenName} from "../types/screen-name.type";
import {Category} from "./category.interface";

export interface QuizState {
  questions: Question[]
  categories: Category[]
  currentQuestionIndex: number,
  correctAnswerCount: number,
  answers: string[],
  screenName: ScreenName,
}
