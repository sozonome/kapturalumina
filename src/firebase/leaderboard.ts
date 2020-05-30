// Every functions related to "leaderboards" root in Realtime Database

import fbase from "./firebaseConfig";
import getCurrentDate from "../functions/getCurrentDate";

export function updateUserLeaderBoardPoints(points: number) {
  const user = fbase.auth().currentUser;
  if (user) {
    const userLeaderboard = fbase.database().ref(`leaderboards/${user.uid}`);

    userLeaderboard.child("dailyPoints").once("value", (snap) => {
      const dailyPointKey = async () => {
        // Get last entry
        const todaysDailyPoint = snap.val().pop();
        console.log(todaysDailyPoint);
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
        console.log(todaysDailyPoint, todaysDailyPointKey)

        const currentDate = getCurrentDate();

        if(dailyPoint==true && todaysDailyPointKey){
          if (todaysDailyPoint.date === currentDate) {
            // Update if today's dailyPoint entry exists
            console.log('update')
            const currentDailyPoint = todaysDailyPoint.points;
            return userLeaderboard.child(`dailyPoints/${todaysDailyPointKey}`).update({
              points: currentDailyPoint+points
            })
          } else {
            // Push new entry
            console.log('push')
            return userLeaderboard.child(`dailyPoints/${parseInt(todaysDailyPointKey)+1}`).set({
              date: currentDate,
              points: points,
            });
          }
        }
      };
      userLeaderboard.child("points").once("value", (snap)=>{
        userLeaderboard.update({
          points: snap.val() + points 
        })
      })

      return dailyPointKey();


      // let todaysDailyPointKey;

      // console.log(todaysDailyPoint, todaysDailyPointKey);
    });
  }
}
