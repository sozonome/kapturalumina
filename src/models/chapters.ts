export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  subModules: SubModule[];
  quiz?: Quiz;
}

export interface SubModule {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  quiz?: Quiz;
  subModules?: SubModule[];
  slides: Slide[];
}

export interface Slide {
  id: string;
  title?: string;
  subTitle?: string;
  titleType?: "big" | "regular";
  text?: string;
  img?: {
    url: string;
    position: "top" | "middle" | "bottom";
    caption?: string;
  };
}

export interface Quiz {
  id: string; 
  pick: number;
  passingScore: Scoring[];
  contents: Question[];
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  content: string;
  correct: boolean;
}

export interface Scoring {
  value: number,
  points: number,
  passed: boolean
}

export interface Score {
  id: string;
  userId: string;
  subModuleId: string;
  score: number;
}
