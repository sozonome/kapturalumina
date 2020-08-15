import { fbase, getCurrentUser, leaderboard, usersData } from ".";
import { Achievement, Chapter } from "../models";
import { presentToast } from "../components/Toast";

export const achievements = fbase.database().ref("achievements");

export const updateUserAchievements = (
  chapterId: string,
  moduleId: string,
  addedChapterProgress: boolean,
  addedModuleProgress: boolean,
  streak?: number,
  passed?: boolean
) => {
  const user = getCurrentUser();
  let chapters: Chapter[] = [];
  let achievementsCatalog: Achievement[] = [];

  let streakAchievements: Achievement[] = [];
  let quizAchievements: Achievement[] = [];
  let moduleAchievements: Achievement[] = [];
  let chapterAchievements: Achievement[] = [];

  let getAchievements: number = 0;

  let quizAch = false;
  let streakAch = false;
  let chapterAch = false;
  let moduleAch = false;

  if (user) {
    achievements
      .once("value", (snap) => {
        achievementsCatalog = snap.val();
      })
      .then(() => {
        fbase
          .database()
          .ref("chapters")
          .once("value", (snap) => {
            chapters = snap.val();
          });
      })
      .then(() => {
        achievementsCatalog.forEach((achievement) => {
          // Quiz Achievements Check
          if (
            achievement.conditions.quizLength &&
            achievement.conditions.streak &&
            streak
          ) {
            chapters.forEach((chapter) => {
              chapter.subModules.forEach((subModule) => {
                if (subModule.id === moduleId && subModule.quiz) {
                  if (
                    achievement.conditions.quizLength ===
                      subModule.quiz.contents.length &&
                    streak === achievement.conditions.streak
                  ) {
                    quizAchievements.push(achievement);
                  }
                }
              });
            });
          }

          // Streak Achievements Check
          if (
            achievement.conditions.quizLength === undefined &&
            achievement.conditions.streak !== undefined &&
            streak
          ) {
            if (streak >= achievement.conditions.streak) {
              streakAchievements.push(achievement);
            }
          }

          // Chapter Achievements Check
          if (addedChapterProgress) {
            leaderboard.child(user.uid).once("value", (snap: any) => {
              if (achievement.conditions.chaptersDone) {
                if (
                  snap.val().chaptersDone >= achievement.conditions.chaptersDone
                ) {
                  chapterAchievements.push(achievement);
                }
              }
            });
          }

          // Module Achievements Check
          if (addedModuleProgress) {
            leaderboard.child(user.uid).once("value", (snap: any) => {
              if (achievement.conditions.modulesDone) {
                if (
                  snap.val().modulesDone >= achievement.conditions.modulesDone
                ) {
                  moduleAchievements.push(achievement);
                }
              }
            });
          }
        });
      })
      .then(() => {
        if (quizAchievements.length > 1) {
          quizAchievements.sort(
            (a, b) => b.conditions.quizLength! - a.conditions.quizLength!
          );
        }
        if (streakAchievements.length > 1) {
          streakAchievements.sort(
            (a, b) => b.conditions.streak! - a.conditions.streak!
          );
        }
        if (chapterAchievements.length > 1) {
          chapterAchievements.sort(
            (a, b) => b.conditions.chaptersDone! - a.conditions.chaptersDone!
          );
        }
        if (moduleAchievements.length > 1) {
          moduleAchievements.sort(
            (a, b) => b.conditions.modulesDone! - a.conditions.modulesDone!
          );
        }
      })
      .then(() => {
        const userAchievementData = usersData
          .child(user.uid)
          .child("achievements");

        userAchievementData
          .once("value", (snap: any) => {
            if (snap.exists()) {
              snap.forEach((userAchievement: any) => {
                if (quizAchievements.length > 0) {
                  if (userAchievement.val().id === quizAchievements[0].id) {
                    const newQty = parseInt(userAchievement.val().qty, 10) + 1;
                    userAchievementData.child(`${userAchievement.key}`).update({
                      qty: newQty,
                    });
                    quizAch = true;
                    getAchievements++;
                  }
                }
                if (streakAchievements.length > 0) {
                  if (userAchievement.val().id === streakAchievements[0].id) {
                    const newQty = parseInt(userAchievement.val().qty, 10) + 1;
                    userAchievementData.child(`${userAchievement.key}`).update({
                      qty: newQty,
                    });
                    streakAch = true;
                    getAchievements++;
                  }
                }
                if (chapterAchievements.length > 0) {
                  if (userAchievement.val().id === chapterAchievements[0].id) {
                    chapterAch = true;
                  }
                }
                if (moduleAchievements.length > 0) {
                  if (userAchievement.val().id === moduleAchievements[0].id) {
                    moduleAch = true;
                  }
                }
              });
            }
          })
          .then(() => {
            if (!quizAch && quizAchievements.length > 0) {
              userAchievementData.push({
                id: quizAchievements[0].id,
                qty: 1,
              });
              getAchievements++;
            }
            if (!streakAch && streakAchievements.length > 0) {
              userAchievementData.push({
                id: streakAchievements[0].id,
                qty: 1,
              });
              getAchievements++;
            }
            if (!chapterAch && chapterAchievements.length > 0) {
              userAchievementData.push({
                id: chapterAchievements[0].id,
              });
              getAchievements++;
            }
            if (!moduleAch && moduleAchievements.length > 0) {
              userAchievementData.push({
                id: moduleAchievements[0].id,
              });
              getAchievements++;
            }
          });
      })
      .then(() => {
        if (getAchievements > 0) {
          presentToast(
            `Kamu mendapat ${getAchievements} pencapaian baru, lihat di 'Profil'`
          );
        }
      });
  }

  // Check current progress
};

export const UpdateUserLeaderBoardAchievements = () => {
  const user = getCurrentUser();
  let dailyUseAchievements: Achievement[] = [];
  let dailyPointsAchievements: Achievement[] = [];

  let dailyUseAch = false;
  let dailyPointAch = false;

  let getAchievements = 0;

  let achievementsCatalog: Achievement[];

  if (user) {
    achievements
      .once("value", (snap) => {
        achievementsCatalog = snap.val();
      })
      .then(() => {
        achievementsCatalog.map((achievement) => {
          return leaderboard
            .child(user.uid)
            .child("dailyPoints")
            .once("value", (snap: any) => {
              if (achievement.conditions.dailyUse !== undefined) {
                if (snap.val().length >= achievement.conditions.dailyUse) {
                  dailyUseAchievements.push(achievement);
                }
              }

              const todayPoints = snap.val().pop();

              if (achievement.conditions.dailyPoints !== undefined) {
                if (todayPoints.points >= achievement.conditions.dailyPoints) {
                  dailyPointsAchievements.push(achievement);
                }
              }
            });
        });
      })
      .then(() => {
        if (dailyUseAchievements && dailyUseAchievements.length > 1) {
          dailyUseAchievements.sort(
            (a, b) => b.conditions.dailyUse! - a.conditions.dailyUse!
          );
        }
        if (dailyPointsAchievements && dailyPointsAchievements.length > 1) {
          dailyPointsAchievements.sort(
            (a, b) => b.conditions.dailyPoints! - a.conditions.dailyPoints!
          );
        }
      })
      .then(() => {
        const userAchievementData = usersData
          .child(user.uid)
          .child("achievements");

        userAchievementData
          .once("value", (snap: any) => {
            if (snap.exists()) {
              snap.forEach((userAchievement: any) => {
                if (dailyPointsAchievements.length > 0) {
                  if (
                    userAchievement.val().id === dailyPointsAchievements[0].id
                  ) {
                    dailyPointAch = true;
                  }
                }
                if (dailyUseAchievements.length > 0) {
                  if (userAchievement.val().id === dailyUseAchievements[0].id) {
                    dailyUseAch = true;
                  }
                }
              });
            }
          })
          .then(() => {
            if (!dailyPointAch && dailyPointsAchievements.length > 0) {
              userAchievementData.push({
                id: dailyPointsAchievements[0].id,
              });
              getAchievements++;
            }
            if (!dailyUseAch && dailyUseAchievements.length > 0) {
              userAchievementData.push({
                id: dailyUseAchievements[0].id,
              });
              getAchievements++;
            }
          });
      })
      .then(() => {
        if (getAchievements > 0) {
          presentToast(
            `Kamu mendapat ${getAchievements} pencapaian baru, lihat di 'Profil'`
          );
        }
      });
  }
};
