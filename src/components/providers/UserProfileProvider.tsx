import React, { useState, useEffect, useContext } from "react";

import Loader from "../Loader";

import { fbase, getCurrentUser } from "../../firebase";
import { AuthContext } from ".";

import { UserData } from "../../models";

const initialUser: UserData = {
  id: "abcde",
  name: "hari yang baik",
  email: "abcd@efgh.com",
  public_id: "public_id",
};

export const UserProfileContext = React.createContext({
  user: initialUser,
});

export const UserProfileProvider = ({ children }: any, props: any) => {
  const [userProfile, setUserProfile] = useState<UserData>(initialUser);
  const [busy, setBusy] = useState<boolean>(true);

  const { currentUser } = useContext(AuthContext);

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
        <UserProfileContext.Provider
          value={{
            user: userProfile,
          }}
        >
          {children}
        </UserProfileContext.Provider>
      )}
    </>
  );
};
