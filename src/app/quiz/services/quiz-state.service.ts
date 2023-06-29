import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {StateService} from "../shared/services/state.service";
import {QuizState} from "../shared/types/interfaces/quiz-state.interface";
import {Question} from "../shared/types/interfaces/question.interface";
import {ScreenName} from "../shared/types/types/screen-name.type";
import {Category} from "../shared/types/interfaces/category.interface";
import {ScoreRecord} from "../shared/types/interfaces/score-record.interface";

const initialState: QuizState = {
  questions: [],
  categories: [],
  currentQuestionIndex: 0,
  correctAnswerCount: 0,
  answers: [],
  screenName: 'home'
}

@Injectable({
  providedIn: 'root'
})
export class QuizStateService extends StateService<QuizState> {

  currentQuestion$: Observable<Question> = this.select(state => state.questions[state.currentQuestionIndex]);
  categories$ = this.select(state => state.categories);
  currentQuestionIndex$ = this.select(state => state.currentQuestionIndex + 1);
  correctAnswerCount$ = this.select(state => state.correctAnswerCount);
  screenName$ = this.select(state => state.screenName);

  constructor() {
    super(initialState)
  }

  showScreen(name: ScreenName) {
    this.setState({
      screenName: name
    })
  }

  setCategories(categories: Category[]) {
    this.setState({
      categories: categories
    })
  }

  setQuestions(questions: Question[]) {
    this.setState({
      questions: questions
    })
  }

  isLastQuestion() {
    return this.state.currentQuestionIndex === this.state.questions.length - 1;
  }

  restart() {
    this.setState(initialState);
  }

  checkAnswer(answer: string) {
    if (this.state.questions[this.state.currentQuestionIndex].correctAnswer === answer) {
      this.setState({
        answers: [...this.state.answers, answer],
        correctAnswerCount: this.state.correctAnswerCount + 1
      })
    } else {
      this.setState({
        answers: [...this.state.answers, answer],
      })
    }
  }

  updateQuizBoard() {
    const quizScoreBoard: ScoreRecord[] = JSON.parse(localStorage.getItem('quizScoreBoard') || '[]');

    quizScoreBoard.push({
      score: this.state.correctAnswerCount,
      answers: this.state.answers
    })
    localStorage.setItem('quizScoreBoard', JSON.stringify(quizScoreBoard));
  }

  nextQuestion() {
    if (this.isLastQuestion()) {
      this.updateQuizBoard();
      this.showScreen('thank-you');
    } else {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      })
    }
  }


}
