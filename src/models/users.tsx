export interface UserData {
  id: string;
  name: string;
  email: string;
  level: number;
  bio?: string;
  achievements?: string[];
  friends?: string[];
  progress?: Progress[];
  streaks?: {
    bestQuizStreak?: number;
    prevBestStreak?: number;
    lastStreak?: number;
  };
  socialLinks?: {
    youtube?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Progress {
  chapterId: string;
  subModuleId: string;
  date?: Date;
  score?: number;
}

export interface Achievement {
  id: string;
  title: string;
  img: string;
  subTitle: string;
}
