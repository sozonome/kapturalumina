import React, { useState, useEffect } from "react";
import fbase from "../firebaseConfig";

export const AuthContext = React.createContext();

export default function AuthProvider(props:any) {
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    fbase.auth().onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
