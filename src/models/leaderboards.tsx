export interface Leaderboard {
  name: string;
  score: number;
  dailyScore?: {
    lastReset: Date;
    value: number;
  };
  level: number;
  chaptersDone: number;
  modulesDone: number;
}
