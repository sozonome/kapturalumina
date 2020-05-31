export interface Achievement {
  id: string;
  title: string;
  img: string;
  conditions: AchievementConditions;
  subTitle?: string;
}

export interface AchievementConditions {
  streak?: number;
  chaptersDone?: number;
  modulesDone?: number;
  quizLength?: number;
  chapterId?: string;
  moduleId?: string;
}
