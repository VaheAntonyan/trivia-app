import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {QuestionDto} from "../shared/types/dtos/question.dto";
import {Question} from "../shared/types/interfaces/question.interface";
import {Category} from "../shared/types/interfaces/category.interface";
import {QuizStateService} from "./quiz-state.service";
import {shuffle} from "../shared/utils/shuffle";

@Injectable({
  providedIn: 'root'
})
export class QuizHttpService {
  private apiCategoryByIdUrl: string = 'https://opentdb.com/api.php?amount=10&encode=url3986&category='
  private apiCategoriesUrl: string = 'https://opentdb.com/api_category.php'

  categories$!: Observable<Category[]>;

  constructor(private httpClient: HttpClient,
              private quizStateService: QuizStateService) {
  }

  loadCategories(): Observable<Category[]> {
    return this.categories$
      ? this.categories$
      : this.categories$ = this.httpClient.get<{ trivia_categories: Category[] }>(this.apiCategoriesUrl)
        .pipe(
          map(response => {
            return response.trivia_categories.sort((a, b) => a.name.localeCompare(b.name))
          }),
          shareReplay({refCount: true, bufferSize: 1})
        )
  }

  loadQuestions(categoryId: number): void {
    this.httpClient.get<{ results: QuestionDto[] }>(this.apiCategoryByIdUrl + categoryId)
      .pipe(
        map(response => response.results),
        map(questions => {
          return questions.map(question => {
            const decodedQuestion = decodeURIComponent(question.question);
            const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
            const decodedIncorrectAnswers = question.incorrect_answers.map(e => decodeURIComponent(e));
            const frontEndQuestion: Question = {
              category: question.category,
              type: question.type,
              difficulty: question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1) as Capitalize<typeof question.difficulty>,
              question: decodedQuestion,
              correctAnswer: decodedCorrectAnswer,
              incorrectAnswers: decodedIncorrectAnswers,
              allAnswers: shuffle([...decodedIncorrectAnswers, decodedCorrectAnswer])
            }
            return frontEndQuestion;
          })
        })
      )
      .subscribe(questions => {
        this.quizStateService.setQuestions(questions);
      })
  }

}
