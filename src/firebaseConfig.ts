import * as firebase from "firebase";
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

firebase.initializeApp(config);

export async function loginUser(userEmail: string, userPassword: string) {
  // Auth with firebase
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    if(error.code === "auth/user-not-found"){
      presentToast("Anda belum terdaftar.", 4000, "warning");
    } else if(error.code === "auth/wrong-password"){
      presentToast("Email atau Kata Sandi Anda salah.", 3000, "warning");
    } else {
      presentToast(error.message, 4000, "warning");
    }
    return false;
  }

  // If present, use can access app
  // If not, error
}

export async function registerUser(userEmail: string, userPassword: string) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    presentToast(error.message, 4000, "warning");
    return false;
  }
}
