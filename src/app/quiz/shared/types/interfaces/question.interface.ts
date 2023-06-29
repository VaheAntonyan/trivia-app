export interface Question {
  category: string,
  type: 'boolean' | 'multiple',
  difficulty: Capitalize<'easy' | 'medium' | 'hard'>,
  question: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  allAnswers: string[]
}
