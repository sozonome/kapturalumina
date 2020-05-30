export interface Leaderboard {
  name: string;
  points: number;
  dailyPoints?: DailyPoint[];
  level?: number;
  chaptersDone?: number;
  modulesDone?: number;
}

export interface DailyPoint {
  date: Date;
  value: number;
}
