// Every functions related to "users" root in Realtime Database

import { fbase, leaderboard, getCurrentUser, updateUserAchievements } from ".";
import { presentToast } from "../components/Toast";

// All Users
export const usersData = fbase.database().ref("users");

// All Chapters
export const chapters = fbase.database().ref("chapters");

export const getUserData = () => {
  const user = getCurrentUser();
  if (user) {
    let userData;
    usersData.child(user.uid).once("value", (snap) => {
      userData = snap.val();
    });
    return userData;
  }
};

export const updateUserLearnProgress = (
  subModuleId: string,
  chapterId: string,
  score: number,
  passed: boolean,
  streak?: number
) => {
  const user = getCurrentUser();
  if (user !== null) {
    const userProgress = usersData.child(user.uid).child("progress");
    const userLeaderboard = leaderboard.child(user.uid);

    let countChapters: number = 0;
    let countModules: number = 0;
    let countModulesTemp: number = 0;
    let newModuleProgress: boolean = true;
    let newChapterProgress: boolean = false;

    let found = false;

    fbase
      .database()
      .ref(`chapters`)
      .once("value", (snapChapter) => {
        snapChapter.forEach((chapter) => {
          userProgress.once("value", (snap) => {
            snap.forEach((progress) => {
              if (chapter.val().id === progress.val().chapterId) {
                chapter.child("subModules").forEach((subModule) => {
                  if (subModule.val().id === progress.val().subModuleId) {
                    countModules++;
                  }
                  if (subModuleId === progress.val().subModuleId) {
                    newModuleProgress = false;
                  }
                  if (
                    countModules === chapter.val().subModules.length ||
                    (countModules === chapter.val().subModules.length - 1 &&
                      newModuleProgress &&
                      passed === true &&
                      subModuleId === chapter.val().subModules.pop().id)
                  ) {
                    if (
                      countModules === chapter.val().subModules.length - 1 &&
                      newModuleProgress &&
                      passed === true &&
                      subModuleId === chapter.val().subModules.pop().id
                    ) {
                      newChapterProgress = true;
                    }
                    countChapters++;
                    countModulesTemp += countModules;
                    countModules = 0;
                  }
                });
              }
            });
          });
        });
      })
      .then(() => {
        userProgress.once("value", (snap) => {
          if (snap.exists()) {
            snap.forEach((row) => {
              // Count Chapters and Modules Done

              // Update Progress
              if (
                row.val().subModuleId === subModuleId &&
                row.val().chapterId === chapterId
              ) {
                found = true;
                // Update new passed module
                if (passed === true && passed !== row.val().passed) {
                  userLeaderboard
                    .child("modulesDone")
                    .set(countModulesTemp + countModules);
                  userLeaderboard.child("chaptersDone").set(countChapters);
                }
                // Update user progress
                if (score > row.val().score) {
                  userProgress.child(`${row.key}`).update({
                    score: score,
                    passed: passed,
                  });
                }
              }
            });
          }
        });
      })
      .then(() => {
        if (!found) {
          // New
          userProgress.push({
            subModuleId: subModuleId,
            chapterId: chapterId,
            score: score,
            passed: passed,
          });
          if (passed === true) {
            userLeaderboard
              .child("modulesDone")
              .set(countModulesTemp + countModules + 1);
            userLeaderboard.child("chaptersDone").set(countChapters);
          }
        }
      })
      .then(() => {
        updateUserAchievements(
          chapterId,
          subModuleId,
          newChapterProgress,
          newModuleProgress,
          streak,
          passed
        );
      });

    // Update User Streak
    if (streak) {
      const userStreak = usersData.child(user.uid).child("streaks");
      userStreak.once("value", (snap) => {
        if (snap.exists()) {
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
    }
  }
};

export const createNewUser = (
  user_uid: string,
  user_email: string,
  user_name: string,
  pub_id: string
) => {
  usersData.child(user_uid).set({
    id: user_uid,
    email: user_email,
    name: user_name,
    points: 0,
    public_id: pub_id,
    bio: "Learning is lifetime process",
  });
};

export const updateUserProfile = async (
  name: string,
  bio?: string,
  instagram?: string,
  youTube?: string,
  website?: string
) => {
  const user = getCurrentUser();

  try {
    if (user) {
      const userLeaderboard = leaderboard.child(user.uid);
      const userData = usersData.child(user.uid);

      userData
        .update({
          name: name,
        })
        .then(() => {
          userLeaderboard.update({
            name: name,
          });
        })
        .then(() => {
          if (bio) {
            userData.child("bio").set(bio);
          }
          if (bio?.length === 0) {
            userData.child("bio").set(null);
          }
          const userProfileLinks = userData.child("socialLinks");
          if (instagram) {
            if (instagram[0] === "@") {
              userProfileLinks.child("instagram").set(instagram.substring(1));
            } else {
              userProfileLinks.child("instagram").set(instagram);
            }
          }
          if (instagram?.length === 0) {
            userProfileLinks.child("instagram").set(null);
          }
          if (youTube) {
            userProfileLinks.child("youtube").set(youTube);
          }
          if (youTube?.length === 0) {
            userProfileLinks.child("youtube").set(null);
          }
          if (website) {
            if (
              website.substring(0, 8) === "https://" ||
              website.substring(0, 7) === "http://"
            ) {
              userProfileLinks.child("website").set(website);
            } else {
              userProfileLinks.child("website").set("https://" + website);
            }
          }
          if (website?.length === 0) {
            userProfileLinks.child("website").set(null);
          }
        });
    }
    return true;
  } catch (error) {
    presentToast(error.message);
    return false;
  }
};

export const followAsFriend = (id: string) => {
  const user = getCurrentUser();
  if (user) {
    usersData.child(user.uid).child("friends").push(id);
  }
};

export const removeFollowedFriend = (id: string) => {
  const user = getCurrentUser();
  if (user) {
    usersData
      .child(user.uid)
      .child("friends")
      .once("value", (snap) => {
        if (snap.exists()) {
          snap.forEach((friend) => {
            if (friend.val() === id) {
              fbase
                .database()
                .ref(`users/${user.uid}/friends/${friend.key}`)
                .remove();
            }
          });
        }
      });
  }
};
