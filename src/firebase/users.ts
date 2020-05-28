// Every functions related to "users" root in Realtime Database

import fbase from "./firebaseConfig";

export function updateUserLearnProgress(
  subModuleId: string,
  chapterId: string,
  score: number,
  passed: boolean,
  streak?: number
) {
  // const currentDate = new Date().toString();
  const user = fbase.auth().currentUser;
  let found = false;
  if (user !== null) {
    const userProgress = fbase
      .database()
      .ref("users/" + user.uid + "/progress");
    userProgress.on("value", (snap) => {
      if (snap.exists()) {
        // Check Previous Score
        // console.log("checking...");
        snap.forEach((row) => {
          if (
            row.val().subModuleId === subModuleId &&
            row.val().chapterId === chapterId
          ) {
            found = true;
            if (score > row.val().score) {
              fbase
                .database()
                .ref("users/" + user.uid + "/progress/" + row.key)
                .update({
                  score: score,
                  passed: passed,
                });
            }
          }
        });
      }
    });
    setTimeout(() => {
      if (!found) {
        // New
        userProgress.push({
          subModuleId: subModuleId,
          chapterId: chapterId,
          score: score,
          passed: passed,
        });
      }
    }, 1000);

    if (streak) {
      const userStreak = fbase
        .database()
        .ref("users")
        .child(user.uid)
        .child("streaks");
      userStreak.on("value", (snap) => {
        if (snap.exists()) {
          const lastStreak = streak;
          let newBestStreak: number, prevBestStreak: number;
          if (streak > snap.val().bestStreak) {
            newBestStreak = streak;
            prevBestStreak = snap.val().bestStreak;
            userStreak.update({
              bestStreak: newBestStreak,
              prevBestStreak: prevBestStreak,
              lastStreak: streak,
            });
          } else if (streak > snap.val().prevBestStreak) {
            prevBestStreak = streak;
            userStreak.update({
              prevBestStreak: prevBestStreak,
              lastStreak: streak,
            });
          } else {
            userStreak.update({
              lastStreak: streak,
            });
          }
        } else {
          userStreak.set({
            lastStreak: streak,
            prevBestStreak: streak,
            bestStreak: streak,
          });
        }
      });
      //
    }
  }
}