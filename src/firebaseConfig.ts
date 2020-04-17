import * as firebase from "firebase/app";
import "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "./environment/environment";
import { presentToast } from "./components/Toast";

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const fbase = firebase.initializeApp(config);

export default fbase;

export async function loginUser(userEmail: string, userPassword: string) {
  // Auth with firebase
  try {
    await fbase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    presentToast(
      "Email atau Kata Sandi yang kamu masukkan salah. Silakan coba lagi.",
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
  } catch (error) {
  }
}

export async function registerUser(
  name: string,
  userEmail: string,
  userPassword: string
) {
  try {
    await fbase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword);
    fbase.auth().currentUser?.updateProfile({
      displayName: name,
    });
    return true;
  } catch (error) {
    presentToast(error.message, 4000, "warning");
    return false;
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = fbase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
}

export function getCurrentUserProfileName() {
  const user = fbase.auth().currentUser;
  if (user) {
    return user.displayName;
  } else {
    return "Belum Login"
  }
}
