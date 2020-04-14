export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  level: number,
  achievements?: Achievement[],
  friends?: string[] 
}

export interface Achievement {
  id: string,
  title: string,
  subTitle: string,
  img: string
}