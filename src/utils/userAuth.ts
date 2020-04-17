import { getCurrentUser } from "../firebaseConfig"

export const isLoggedIn = () => {
  if(getCurrentUser() !== null) return true;
  return false;
}