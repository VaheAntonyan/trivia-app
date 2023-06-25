export interface BackendQuestion {
  category: string,
  type: 'boolean' | 'multiple',
  difficulty: 'easy' | 'medium' | 'hard',
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

export interface FrontendQuestion {
  category: string,
  type: 'boolean' | 'multiple',
  difficulty: 'easy' | 'medium' | 'hard',
  question: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  allAnswers: string[]
}
