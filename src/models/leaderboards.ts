export type Leaderboard = {
  name: string;
  public_id: string;
  points: number;
  dailyPoints?: DailyPoint[];
  level?: number;
  chaptersDone?: number;
  modulesDone?: number;
};

export type DailyPoint = {
  date: Date;
  value: number;
  modulesDone: number;
};
