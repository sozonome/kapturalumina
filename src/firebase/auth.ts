// Functions related to Authentication with Firebase

import { fbase, createNewUser, initUserLeaderBoard } from ".";
import { presentToast } from "../components/Toast";
import { randomString } from "../functions";

export const loginUser = async (userEmail: string, userPassword: string) => {
  // Auth with firebase
  try {
    await fbase.auth().signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    let errormsg =
      "Email atau Kata Sandi yang kamu masukkan salah. Silakan coba lagi.";
    if (error.code === "auth/user-not-found") {
      errormsg = "Akun ini belum terdaftar";
    }
    presentToast(errormsg, 4000, "warning");
    return false;
  }

  // If present, user can access app
  // If not, error
};

export const logoutUser = async () => {
  try {
    await fbase.auth().signOut();
    presentToast("Anda telah keluar", 2500, "warning");
    return true;
  } catch (error) {
    return false;
  }
};

export const registerUser = async (
  name: string,
  userEmail: string,
  userPassword: string
) => {
  try {
    await fbase.auth().createUserWithEmailAndPassword(userEmail, userPassword);

    const user = fbase.auth().currentUser;
    user?.updateProfile({
      displayName: name,
    });

    if (user !== null) {
      const public_id = randomString();
      createNewUser(user.uid, userEmail, name, public_id);
      initUserLeaderBoard(user.uid, name, public_id);
    }
    return true;
  } catch (error) {
    // TODO : try to handle error message in localized language
    presentToast(error.message, 4000, "warning");
    return false;
  }
};

export const getCurrentUser = () => {
  const user = fbase.auth().currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const getCurrentUserProfileName = () => {
  const user = fbase.auth().currentUser;
  if (user) {
    return user.displayName;
  } else {
    return "Belum Login";
  }
};
