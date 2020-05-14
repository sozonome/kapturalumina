export interface UserData {
  id: string,
  name: string,
  email: string,
  level: number,
  achievements?: string[],
  friends?: string[],
  progress: Progress[],
  streaks?: {
    bestQuizStreak?: number,
    prevBestStreak?: number,
    lastStreak?: number
  }
}

export interface Progress {
  chapterId: string,
  subModuleId: string,
  score: number
}

export interface Achievement {
  id: string,
  title: string,
  img: string,
  subtitle: string,
}