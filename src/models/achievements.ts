export type Achievement = {
  id: string;
  title: string;
  subTitle?: string;
  img: string;
  conditions: AchievementConditions;
  oneTime: boolean;
};

export type AchievementConditions = {
  streak?: number;
  chaptersDone?: number;
  modulesDone?: number;
  quizLength?: number;
  dailyUse?: number;
  dailyPoints?: number;
  chapterId?: string;
  moduleId?: string;
};
