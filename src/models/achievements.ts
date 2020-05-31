export interface Achievement {
  id: string;
  title: string;
  img: string;
  conditions: AchievementConditions;
  subTitle?: string;
  oneTime: boolean;
}

export interface AchievementConditions {
  streak?: number;
  chaptersDone?: number;
  modulesDone?: number;
  quizLength?: number;
  dailyUse?: number;
  dailyPoints?: number;
  chapterId?: string;
  moduleId?: string;
}
