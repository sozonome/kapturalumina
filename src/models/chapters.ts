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
  passingPoints?:number;
  quiz?: Quiz;
  slides: Slide[];
}

export interface Slide {
  id: string;
  title?: string;
  subTitle?: string;
  titleType?: "big" | "regular";
  text?: string;
  img?: ContentImg;
}

export interface ContentImg{
  url: string;
  position: "top" | "middle" | "bottom";
  caption?: string;
}

export interface Quiz {
  id: string; 
  contents: Question[];
  passingScore: Scoring[];
  pick: number;
}

export interface Question {
  id: number;
  question: string;
  img?: {
    url: string,
    caption?: string
  };
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
