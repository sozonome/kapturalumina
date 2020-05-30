import React, { useState, useEffect, useContext } from "react";

import { getCurrentUser } from "../../firebase/auth";
import fbase from "../../firebase/firebaseConfig";
import Loader from "../Loader";
import { UserData } from "../../models/users";
import { AuthContext } from "./AuthProvider";

const initialUser:UserData = {
  id: 'abcde',
  name: 'hari yang baik',
  email: 'abcd@efgh.com',
  public_id: 'public_id'
}

export const UserProfileContext = React.createContext({
  user: initialUser,
});

export default function UserProfileProvider({ children }: any, props: any) {
  const [userProfile, setUserProfile] = useState<UserData>(initialUser);
  const [busy, setBusy] = useState<boolean>(true);

  const {currentUser} = useContext(AuthContext);

  const user = getCurrentUser();

  useEffect(() => {
    // setBusy(true);
    if (user) {
      fbase
        .database()
        .ref(`users/${user.uid}`)
        .on("value", (snap) => {
          setUserProfile(initialUser);
          setUserProfile(snap.val());
        });
    } else {
      setUserProfile(initialUser);
    }
    setBusy(false);
  }, [user, currentUser]);

  return (
    <>
      {busy ? (
        <Loader />
      ) : (
        <UserProfileContext.Provider value={{
          user:userProfile
        }}>{children}</UserProfileContext.Provider>
      )}
    </>
  );
}
