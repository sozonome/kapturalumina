export type BaseType = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  quiz?: Quiz;
};

export type Chapter = BaseType & {
  subModules: Array<SubModule>;
};

export type SubModule = BaseType & {
  passingPoints?: number;
  slides: Array<Slide>;
};

export type Slide = Pick<BaseType, "id" | "title" | "subtitle"> & {
  titleType?: "big" | "regular";
  text?: string;
  img?: ContentImg;
};

export type ContentImg = {
  url: string;
  position: "top" | "middle" | "bottom";
  caption?: string;
};

export type Quiz = Pick<BaseType, "id"> & {
  contents: Array<Question>;
  passingScore: Array<Scoring>;
  pick: number;
};

export type Question = {
  id: number;
  question: string;
  img?: {
    url: string;
    caption?: string;
  };
  answers: Array<Answer>;
};

export type Answer = {
  content: string;
  correct: boolean;
};

export type Scoring = {
  value: number;
  points: number;
  passed: boolean;
};
