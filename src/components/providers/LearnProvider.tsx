import React, { useState, useEffect } from "react";

import Loader from "../Loader";

import { fbase } from "../../firebase";

import { Chapter } from "../../models";

export const LearnContext = React.createContext({
  chapters: [] as Chapter[],
});

export const LearnProvider = ({ children }: any) => {
  const [chaptersState, setChaptersState] = useState<Chapter[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    fbase.auth().onAuthStateChanged(() => {
      const rootRef = fbase.database().ref();
      const chaptersRef = rootRef.child("chapters");
      setChaptersState([]);

      chaptersRef.on("value", (snap) => {
        setChaptersState(snap.val());
      });

      setBusy(false);
    });
  }, []);

  return (
    <>
      {busy ? (
        <Loader />
      ) : (
        <LearnContext.Provider
          value={{
            chapters: chaptersState,
          }}
        >
          {children}
        </LearnContext.Provider>
      )}
    </>
  );
};
