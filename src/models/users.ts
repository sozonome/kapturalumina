export type UserData = {
  id: string;
  name: string;
  email: string;
  public_id: string;
  bio?: string;
  achievements?: Array<{
    id: string;
    qty?: number;
  }>;
  friends?: Array<string>;
  progress?: Array<Progress>;
  streaks?: {
    bestStreak?: number;
    prevBestStreak?: number;
    lastStreak?: number;
  };
  socialLinks?: {
    youtube?: string;
    instagram?: string;
    website?: string;
  };
};

export type Progress = {
  chapterId: string;
  subModuleId: string;
  date?: Date;
  score?: number;
  passed: boolean;
};

export type ProfilePicture = {
  id: string;
  img: {
    name: string;
    src: string;
  };
  unlockLimit: number;
};
