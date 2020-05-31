import fbase from "./firebaseConfig";
import { getCurrentUser } from "./auth";
import { usersData } from "./users";

export const achievements = fbase.database().ref('achievements')

export function updateUserAchievements(
  streak: number,
  chapterId: string,
  moduleId: string,
){
  const user = getCurrentUser();
  if(user){
    usersData.child(user.uid)
  }
}