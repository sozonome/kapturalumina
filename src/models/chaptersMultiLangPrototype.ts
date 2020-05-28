// For Next Version of KapturaLumina

export interface Chapter {
  id: string;
  title: multiLang;
  subtitle?: multiLang;
  thumbnail?: string;
  subModules: SubModule[];
  quiz?: Quiz;
}

export interface multiLang{
  id?:string;
  en?:string;
  // add other language
}

export interface SubModule {
  id: string;
  title: multiLang;
  subtitle?: multiLang;
  thumbnail?: string;
  quiz?: Quiz;
  subModules?: SubModule[];
  slides: Slide[];
}

export interface Slide {
  id: string;
  title?: multiLang;
  subTitle?: multiLang;
  titleType?: "big" | "regular";
  text?: multiLang;
  img?: {
    url: string;
    position: "top" | "middle" | "bottom";
    caption?: string;
  };
}

export interface Quiz {
  id: string;
  pick: number;
  contents: Question[];
}

export interface Question {
  id: string;
  question: multiLang;
  answers: Answer[];
}

export interface Answer {
  content: multiLang;
  correct: boolean;
}

export interface Score {
  id: string;
  userId: string;
  subModuleId: string;
  score: number;
}
