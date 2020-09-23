// Every functions related to "leaderboards" root in Realtime Database
import { fbase, getCurrentUser, UpdateUserLeaderBoardAchievements } from ".";
import { getCurrentDate } from "../functions";

export const leaderboard = fbase.database().ref(`leaderboards`);

export const initUserLeaderBoard = (
  user_uid: string,
  user_name: string,
  pub_id: string
) => {
  leaderboard.child(user_uid).set({
    name: user_name,
    points: 0,
    chaptersDone: 0,
    modulesDone: 0,
    public_id: pub_id,
    dailyPoints: [
      {
        date: getCurrentDate(),
        points: 0,
      },
    ],
  });
};

export const updateUserLeaderBoardPoints = (points: number) => {
  const user = getCurrentUser();

  // To make sure if mistakenly insert chapters scoring entry in form of string in database
  if (typeof points === "string") {
    points = parseInt(points, 10);
  }

  if (user !== null) {
    const userLeaderboard = leaderboard.child(user.uid);
    userLeaderboard.child("dailyPoints").once("value", (snap) => {
      if (snap.exists()) {
        const dailyPointKey = async () => {
          // Get last entry
          const todaysDailyPoint = snap.val().pop();
          let todaysDailyPointKey;
          let i = 0;

          // Get entry key
          const dailyPoint = await snap.forEach((entry) => {
            i++;
            if (i === snap.val().length) {
              todaysDailyPointKey = entry.key;
              return true;
            }
          });

          const currentDate = getCurrentDate();

          if (dailyPoint === true && todaysDailyPointKey) {
            if (todaysDailyPoint.date === currentDate) {
              // Update if today's dailyPoint entry exists

              const currentDailyPoint: number =
                parseInt(todaysDailyPoint.points, 10) + points;
              return userLeaderboard
                .child(`dailyPoints/${todaysDailyPointKey}`)
                .update({
                  points: currentDailyPoint,
                });
            } else {
              // Push new entry
              return userLeaderboard
                .child(`dailyPoints/${parseInt(todaysDailyPointKey, 10) + 1}`)
                .set({
                  date: currentDate,
                  points: points,
                });
            }
          }
        };
        userLeaderboard.once("value", (snapshot) => {
          const currentPoints = parseInt(snapshot.val().points, 10) + points;

          userLeaderboard.update({
            points: currentPoints,
          });
        });

        return dailyPointKey().then(() => UpdateUserLeaderBoardAchievements());
      }
    });
  }
};
