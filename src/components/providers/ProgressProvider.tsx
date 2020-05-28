import { Progress } from "../../models/users";
import React, { useState, useEffect, useContext } from "react";
import fbase, { getCurrentUser } from "../../firebaseConfig";
import Loader from "../Loader";

export const UserProgressContext = React.createContext({
  progress: [] as Progress[],
});

export default function UserProgressProvider({ children }: any, props: any) {
  const [progressState, setProgressState] = useState<Progress[]>([]);
  const [busy, setBusy] = useState(true);
  const user = getCurrentUser();
  
  useEffect(() => {
    fbase.auth().onAuthStateChanged(() => {
      if (user) {
        fbase
          .database()
          .ref("users/" + user.uid + "/progress")
          .on("value", (snapshot) => {
            setProgressState([]);
            snapshot.forEach((row) => {
              setProgressState((prog) => [...prog, row.val()]);
            });
          });
      }
    });
    setBusy(false);
  }, []);

  return (
    <>
      {/* {console.log("UserProgressProvider", progressState, user?.uid)} */}
      {busy ? (
        <Loader />
      ) : (
        <UserProgressContext.Provider
          value={{
            progress: progressState,
          }}
        >
          {children}
        </UserProgressContext.Provider>
      )}
    </>
  );
}
