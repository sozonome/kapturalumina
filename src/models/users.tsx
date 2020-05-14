export interface UserData {
  id: string,
  name: string,
  email: string,
  level: number,
  achievements?: string[],
  friends?: string[],
  progress: Progress[]
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