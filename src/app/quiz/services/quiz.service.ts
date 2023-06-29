import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {QuestionDto} from "../shared/types/dtos/question.dto";
import {Question} from "../shared/types/interfaces/question.interface";
import {QuizState} from "../shared/types/interfaces/quiz-state.interface";
import {ScoreRecord} from "../shared/types/interfaces/score-record.interface";
import {ScreenName} from "../shared/types/types/screen-name.type";
import {Category} from "../shared/types/interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiCategoryByIdUrl: string = 'https://opentdb.com/api.php?amount=10&encode=url3986&category='
  private apiCategoriesUrl: string = 'https://opentdb.com/api_category.php'

  private initialState: QuizState = {
    questions: [],
    categories: [],
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    answers: [],
    screenName: 'home'
  }

  constructor(private httpClient: HttpClient) {
  }

  state$: BehaviorSubject<QuizState> = new BehaviorSubject<QuizState>(this.initialState)

  getState(): QuizState {
    return this.state$.getValue()
  }

  setState(partialState: Partial<QuizState>): void {
    this.state$.next({
      ...this.getState(),
      ...partialState
    })
  }

  nextQuestion(): void {
    const state = this.getState();
    if (state.currentQuestionIndex === state.questions.length - 1) {
      this.updateQuizBoard();
      this.showScreen('thank-you');
    } else {
      this.setState({
        currentQuestionIndex: state.currentQuestionIndex + 1
      })
    }
  }

  private updateQuizBoard() {
    const state = this.getState();
    const quizScoreBoard: ScoreRecord[] = JSON.parse(localStorage.getItem('quizScoreBoard') || '[]');

    quizScoreBoard.push({
      score: state.correctAnswerCount,
      answers: state.answers
    })
    localStorage.setItem('quizScoreBoard', JSON.stringify(quizScoreBoard));
  }

  showScreen(name: ScreenName) {
    this.setState({
      screenName: name
    })
  }

  loadCategories(): void {
    this.httpClient.get<{ trivia_categories: Category[] }>(this.apiCategoriesUrl)
      .pipe(
        map(response => {
          return response.trivia_categories.sort((a, b) => a.name.localeCompare(b.name))
        })
      )
      .subscribe(categories => {
        this.setState({
          categories: categories
        })
      })
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
              allAnswers: this.shuffle([...decodedIncorrectAnswers, decodedCorrectAnswer])
            }
            return frontEndQuestion;
          })
        })
      )
      .subscribe(questions => {
        this.setState({
          questions: questions
        })
      })
  }

  private shuffle(strings: string[]): string[] {
    return strings.sort(() => Math.random() - 0.5);
  }

  restart() {
    this.setState(this.initialState);
  }

  checkAnswer(answer: string) {
    const state = this.state$.getValue();
    if (state.questions[state.currentQuestionIndex].correctAnswer === answer) {
      this.setState({
        answers: [...state.answers, answer],
        correctAnswerCount: state.correctAnswerCount + 1
      })
    } else {
      this.setState({
        answers: [...state.answers, answer]
      })
    }
  }
}
