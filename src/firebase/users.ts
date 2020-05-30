// Every functions related to "users" root in Realtime Database

import fbase from "./firebaseConfig";
import { presentToast } from "../components/Toast";
import { useContext } from "react";
import { UserProgressContext } from "../components/providers/ProgressProvider";
import { LearnContext } from "../components/providers/LearnProvider";

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
    // const {progress:userProgress} = useContext(UserProgressContext);
    const userProgress = fbase
      .database()
      .ref("users/" + user.uid + "/progress/");
    const userLeaderboard = fbase.database().ref("leaderboards/" + user.uid);

    const chapters = fbase.database().ref("/chapters");
    let countChapters: number = 0;
    let countModules: number = 0;

    let currentChapterRead: string | undefined;
    let currentModuleRead: string | undefined;

    userProgress.once("value", (snap) => {
      if (snap.exists()) {
        // Check Previous Score
        // console.log("checking...");

        console.log(snap.val());

        snap.forEach((row) => {
          // Count Chapters and Modules Done

          if (
            currentModuleRead === undefined ||
            currentModuleRead !== row.val().subModuleId
          ) {
            currentModuleRead = row.val().subModuleId;
            if (row.val().passed === true) {
              countModules++;
              console.log("Count Modules: ", countModules);
            }
          }
          if (
            currentChapterRead === undefined ||
            currentChapterRead !== row.val().chapterId
          ) {
            currentChapterRead = row.val().chapterId;
            // chapters.once("value", (snapChapter) => {
            //   snapChapter.forEach((chapterRow) => {

            //     if (chapterRow.val().id === currentChapterRead) {
            //       console.log(
            //         "db chapter id",
            //         chapterRow.val().id,
            //         currentChapterRead,
            //         chapterRow.val().subModules.length
            //       );
            //       if (countModules === chapterRow.val().subModules.length) {
            //       }
            //     }
            //   });
            // });
            countChapters++;
            console.log("Count Chapters: ", countChapters);
          }
          console.log(
            "Count Chapters: ",
            countChapters,
            "Count Modules: ",
            countModules,
            "currentChapter: ",
            currentChapterRead,
            "currentModule:",
            currentModuleRead,
            row.val().chapterId,
            row.val().subModuleId
          );

          // Update Progress
          if (
            row.val().subModuleId === subModuleId &&
            row.val().chapterId === chapterId
          ) {
            found = true;
            if (passed === true && passed !== row.val().passed) {
              console.log("update leaderboard");
              userLeaderboard.child("modulesDone").set(countModules + 1);
              userLeaderboard.child("chaptersDone").set(countChapters);
            }
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
        if (passed = true) {
          userLeaderboard.child("modulesDone").set(countModules+1);
          userLeaderboard.child("chaptersDone").set(countChapters);
        }
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

export async function updateUserProfile(
  name: string,
  bio?: string,
  instagram?: string,
  youTube?: string,
  website?: string
) {
  const user = fbase.auth().currentUser;
  if (user) {
    const userProfile = fbase.database().ref(`/users/${user.uid}`);
    const userLeaderboard = fbase.database().ref(`/leaderboards/${user.uid}`);

    userProfile.update({
      name: name,
    });
    userLeaderboard.update({
      name: name,
    });
    if (bio) {
      userProfile.child("bio").set(bio);
    }
    if (bio?.length === 0) {
      userProfile.child("bio").set(null);
    }
    const userProfileLinks = userProfile.child("socialLinks");
    if (instagram) {
      if(instagram[0]==="@"){
        userProfileLinks.child("instagram").set(instagram.substring(1));
      }else{
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
      if(website.substring(0,8)==="https://" || website.substring(0,7) === "http://"){
        userProfileLinks.child("website").set(website);
      }else{
        userProfileLinks.child("website").set("https://"+website);
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
  }
}
