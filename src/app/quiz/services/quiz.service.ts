import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {BackendQuestion, FrontendQuestion} from "../models/question.model";

export type ScreenName = 'home' | 'quiz' | 'thank-you' | 'score-board'
interface QuizState {
  questions: FrontendQuestion[]
  currentQuestionIndex: number,
  correctAnswerCount: number,
  answers: string[],
  screenName: ScreenName,
}

export interface ScoreRecord {
  score: number;
  answers: string[];
}

@Injectable()
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=10&encode=url3986&category='

  private initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    answers: [],
    screenName: 'home'
  }

  constructor(private httpClient: HttpClient) {
  }

  state$: BehaviorSubject<QuizState> = new BehaviorSubject<QuizState>(this.initialState)

  setState(partialState: Partial<QuizState>): void {
    this.state$.next({
      ...this.state$.getValue(),
      ...partialState
    })
  }

  getState(): QuizState {
    return this.state$.getValue()
  }

  nextQuestion(): void {
    const state = this.getState();
    if (state.currentQuestionIndex === state.questions.length - 1) {
      this.showScreen('thank-you');
      const state = this.state$.getValue();
      const quizScoreBoard: ScoreRecord[] = JSON.parse(localStorage.getItem('quizScoreBoard') || '[]');

      quizScoreBoard.push({
        score: state.correctAnswerCount,
        answers: state.answers
      })
      localStorage.setItem('quizScoreBoard', JSON.stringify(quizScoreBoard));
    } else {
      this.setState({
        currentQuestionIndex: this.getState().currentQuestionIndex + 1
      })
    }
  }

  showScreen(name: ScreenName) {
    this.setState({
      screenName: name
    })
  }

  loadQuestions(categoryId: number): void {
    this.httpClient.get<{ results: BackendQuestion[] }>(this.apiUrl + categoryId)
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
