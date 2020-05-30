// Functions related to Authentication with Firebase

import fbase from "./firebaseConfig";
import { presentToast } from "../components/Toast";
import getCurrentDate from "../functions/getCurrentDate";
import { createNewUser } from "./users";
import { initUserLeaderBoard } from "./leaderboard";

export async function loginUser(userEmail: string, userPassword: string) {
  // Auth with firebase
  try {
    await fbase.auth().signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    console.log(error)
    let errormsg = "Email atau Kata Sandi yang kamu masukkan salah. Silakan coba lagi.";
    if(error.code === "auth/user-not-found"){
      errormsg = "Akun ini belum terdaftar"
    }
    presentToast(
      errormsg,
      4000,
      "warning"
    );
    return false;
  }

  // If present, use can access app
  // If not, error
}

export async function logoutUser() {
  try {
    await fbase.auth().signOut();
    presentToast("Anda telah keluar", 2500, "warning");
    return true;
  } catch (error) {
    return false;
  }
}

export async function registerUser(
  name: string,
  userEmail: string,
  userPassword: string
) {
  try {
    await fbase.auth().createUserWithEmailAndPassword(userEmail, userPassword);


    const user = fbase.auth().currentUser;
    user?.updateProfile({
      displayName: name,
    });

    if (user !== null) {
      createNewUser(user.uid, userEmail, name);
      initUserLeaderBoard(user.uid, name)
    }
    return true;
  } catch (error) {
    // TODO : try to handle error message in localized language
    presentToast(error.message, 4000, "warning");
    return false;
  }
}

export function getCurrentUser() {
  // return new Promise((resolve, reject) => {
  //   const unsubscribe = fbase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       resolve(user);
  //       return true;
  //     }
  //     reject(null);
  //     unsubscribe();
  //     return false;
  //   });
  // });

  const user = fbase.auth().currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
}

export function getCurrentUserProfileName() {
  const user = fbase.auth().currentUser;
  if (user) {
    return user.displayName;
  } else {
    return "Belum Login";
  }
}
