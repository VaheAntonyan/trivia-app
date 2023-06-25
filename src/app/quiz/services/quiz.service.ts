import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BackendQuestion, FrontendQuestion} from "../models/question.model";

@Injectable()
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=10&category='

  constructor(private httpClient: HttpClient) {
  }

  loadQuestions(categoryId: number): Observable<FrontendQuestion[]> {
    return this.httpClient.get<{ results: BackendQuestion[] }>(this.apiUrl + categoryId)
      .pipe(
        map(response => response.results),
        map(questions => {
          return questions.map(question => {
            const decodedQuestion = decodeURIComponent(question.question);
            const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
            const decodedIncorrectAnswers = question.incorrect_answers.map(e => decodeURIComponent(e));
            const frontEndQuestion: FrontendQuestion = {
              category: question.category,
              type: question.type,
              difficulty: question.difficulty,
              question: decodedQuestion,
              correctAnswer: decodedCorrectAnswer,
              incorrectAnswers: decodedIncorrectAnswers,
              allAnswers: this.shuffle([...decodedIncorrectAnswers, decodedCorrectAnswer])
            }
            return frontEndQuestion;
          })
        })
      )
  }

  private shuffle(strings: string[]) {
    return strings.sort(() => Math.random() - 0.5);
  }

}
