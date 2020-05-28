// Every functions related to "users" root in Realtime Database

import fbase from "./firebaseConfig";
import { presentToast } from "../components/Toast";

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
    userProfile.update({
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
      userProfileLinks.child("instagram").set(instagram);
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
      userProfileLinks.child("website").set(website);
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
