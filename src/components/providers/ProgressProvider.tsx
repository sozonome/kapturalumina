import { Progress } from "../../models/users";
import React, { useState, useEffect, useContext } from "react";
import fbase from "../../firebase/firebaseConfig";
import { getCurrentUser } from "../../firebase/auth";
import Loader from "../Loader";
import { AuthContext } from "./AuthProvider";

export const UserProgressContext = React.createContext({
  progress: [] as Progress[],
});

export default function UserProgressProvider({ children }: any, props: any) {
  const { currentUser } = useContext(AuthContext);
  const [progressState, setProgressState] = useState<Progress[]>([]);
  const [busy, setBusy] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
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
    } else {
      setProgressState([]);
    }
    setBusy(false);
  }, [currentUser, user]);

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
