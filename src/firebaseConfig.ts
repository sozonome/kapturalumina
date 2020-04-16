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
import { resolve } from "dns";

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
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    presentToast("Email atau Kata Sandi yang kamu masukkan salah. Silakan coba lagi.", 4000, "warning");
    return false;
  }

  // If present, use can access app
  // If not, error
}

export async function logoutUser(){
  try{
    await firebase.auth().signOut();
  }catch(error){
    console.log(error);
  }
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

export function getCurrentUser(){
  return new Promise((resolve, reject)=> {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      function(user){
        if(user) {
          resolve(user)
          console.log(user.email, user.displayName);
        } else{
          resolve(null)
        }
        unsubscribe()
      }
    )
  })
}