import React, { useState, useEffect } from "react";

import { getCurrentUser } from "../../firebase/auth";
import fbase from "../../firebase/firebaseConfig";
import Loader from "../Loader";
import { UserData } from "../../models/users";

const initialUser:UserData = {
  id: 'abcde',
  name: 'Blank User',
  email: 'abcd@efgh.com',
  points: 0
}

export const UserProfileContext = React.createContext({
  user: initialUser,
});

export default function UserProfileProvider({ children }: any, props: any) {
  const [userProfile, setUserProfile] = useState<UserData>(initialUser);
  const [busy, setBusy] = useState<boolean>(true);

  const user = getCurrentUser();

  useEffect(() => {
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
  }, [user]);

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
