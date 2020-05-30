// Every functions related to "users" root in Realtime Database

import fbase from "./firebaseConfig";
import { presentToast } from "../components/Toast";
import { leaderboard } from "./leaderboard";
import { getCurrentUser } from "./auth";
import randomString from "../functions/randomString";

// All Users
export const usersData = fbase.database().ref("users");

// All Chapters
export const chapters = fbase.database().ref("chapters");

export function getUserData() {
  const user = getCurrentUser();
  if (user) {
    let userData;
    usersData.child(user.uid).once("value", (snap) => {
      userData = snap.val();
    });
    return userData;
  }
}

export function updateUserLearnProgress(
  subModuleId: string,
  chapterId: string,
  score: number,
  passed: boolean,
  streak?: number
) {
  const user = getCurrentUser();
  if (user !== null) {
    console.log("user learn progress function");
    const userProgress = usersData.child(user.uid).child("progress");
    const userLeaderboard = leaderboard.child(user.uid);

    let countChapters: number = 0;
    let countModules: number = 0;
    let currentChapterRead: string | undefined;
    let currentModuleRead: string | undefined;

    let found = false;

    userProgress.once("value", (snap) => {
      if (snap.exists()) {
        // Check Previous Score

        snap.forEach((row) => {
          // Count Chapters and Modules Done
          if (
            currentModuleRead === undefined ||
            currentModuleRead !== row.val().subModuleId
          ) {
            currentModuleRead = row.val().subModuleId;
            if (row.val().passed === true) {
              countModules++;
            }
          }
          if (
            currentChapterRead === undefined ||
            currentChapterRead !== row.val().chapterId
          ) {
            currentChapterRead = row.val().chapterId;
            countChapters++;
          }

          // Update Progress
          if (
            row.val().subModuleId === subModuleId &&
            row.val().chapterId === chapterId
          ) {
            found = true;
            if (passed === true && passed !== row.val().passed) {
              userLeaderboard.child("modulesDone").set(countModules + 1);
              userLeaderboard.child("chaptersDone").set(countChapters);
            }
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

    setTimeout(() => {
      if (!found) {
        // New
        userProgress.push({
          subModuleId: subModuleId,
          chapterId: chapterId,
          score: score,
          passed: passed,
        });
        if ((passed = true)) {
          userLeaderboard.child("modulesDone").set(countModules + 1);
          userLeaderboard.child("chaptersDone").set(countChapters);
        }
      }
    }, 1000);

    // Update User Streak
    if (streak) {
      const userStreak = usersData.child(user.uid).child("streaks");
      userStreak.on("value", (snap) => {
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
}

export function createNewUser(
  user_uid: string,
  user_email: string,
  user_name: string,
  pub_id:string
) {
  usersData.child(user_uid).set({
    id: user_uid,
    email: user_email,
    name: user_name,
    points: 0,
    public_id: pub_id,
    bio: "Learning is lifetime process"
  });
}

export async function updateUserProfile(
  name: string,
  bio?: string,
  instagram?: string,
  youTube?: string,
  website?: string
) {
  const user = getCurrentUser();
  if (user) {
    const userLeaderboard = leaderboard.child(user.uid);
    const userData = usersData.child(user.uid);

    userData.update({
      name: name,
    });
    userLeaderboard.update({
      name: name,
    });
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
  }

  try {
    return true;
  } catch (error) {
    presentToast(error.message);
    return false;
  }
}
