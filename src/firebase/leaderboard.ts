// Every functions related to "leaderboards" root in Realtime Database

import fbase from "./firebaseConfig";
import getCurrentDate from "../functions/getCurrentDate";
import { getCurrentUser } from "./auth";

export const leaderboard = fbase.database().ref(`leaderboards`);

export function initUserLeaderBoard(
  user_uid: string,
  user_name: string
){
  leaderboard.child(user_uid).set({
    name: user_name,
    points: 0,
    chaptersDone: 0,
    modulesDone: 0,
    dailyPoints: [{
      date : getCurrentDate(),
      points: 0
    }]
  })
}

export function updateUserLeaderBoardPoints(points: number) {
  const user = getCurrentUser();

  if (user !==null) {
    const userLeaderboard = leaderboard.child(user.uid)
    userLeaderboard.child("dailyPoints").once("value", (snap) => {
      if(snap.exists()){
        const dailyPointKey = async () => {
          // Get last entry
          const todaysDailyPoint = snap.val().pop();
          // console.log(todaysDailyPoint);
          let todaysDailyPointKey;
          let i = 0;
  
          // Get entry key
          const dailyPoint = await snap.forEach((entry) => {
            i++;
            if (i == snap.val().length) {
              todaysDailyPointKey = entry.key;
              return true;
            }
          });
  
          const currentDate = getCurrentDate();
  
          if (dailyPoint == true && todaysDailyPointKey) {
            if (todaysDailyPoint.date === currentDate) {
              // Update if today's dailyPoint entry exists
              const currentDailyPoint = todaysDailyPoint.points;
              return userLeaderboard
                .child(`dailyPoints/${todaysDailyPointKey}`)
                .update({
                  points: currentDailyPoint + points,
                });
            } else {
              // Push new entry
              return userLeaderboard
                .child(`dailyPoints/${parseInt(todaysDailyPointKey) + 1}`)
                .set({
                  date: currentDate,
                  points: points,
                });
            }
          }
        };
        userLeaderboard.child("points").once("value", (snap) => {
          userLeaderboard.update({
            points: snap.val() + points,
          });
        });
  
        return dailyPointKey();
      }
    });
  }
}
