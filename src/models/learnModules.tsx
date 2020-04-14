export interface LearnModule{
  id: string,
  title: string,
  subtitle?: string,
  thumbnail?: string,
  subModules: SubModule[],
  quiz?: Quiz
}

export interface SubModule {
  id: string,
  title: string,
  thumbnail?:string,
  subtitle?: string,
  slides: Slide[],
  quiz: Quiz
}

export interface Slide {
  title?: string,
  text?: string,
  img?: string
}

export interface Quiz {
  id: string,
  questions: Question[],
}

export interface Question {
  id: string,
  question: string,
  answers: Answer[]
}

export interface Answer {
  answer: string,
  correct: boolean
}

export interface Score {
  id: string,
  userId: string,
  subModuleId: string,
  score: number
}