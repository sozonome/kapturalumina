import React, { useState, useEffect } from "react";
import fbase from "../../firebaseConfig";
import Loader from "../Loader";
import useAbortableEffect from "../../functions/useAbortableEffect";

export const AuthContext = React.createContext({
  currentUser: null,
});

export default function AuthProvider({ children }: any) {
  const [currentUserState, setCurrentUserState] = useState<any>(null);
  const [busy, setBusy] = useState(true);
  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    fbase.auth().onAuthStateChanged((user) => {
      setCurrentUserState(user);
      setBusy(false);
    });
  }, []);

  return (
    <>
      {/* {console.log("Auth Provider")} */}
      {busy === true ? (
        <Loader />
      ) : (
        <AuthContext.Provider
          value={{
            currentUser: currentUserState,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}
