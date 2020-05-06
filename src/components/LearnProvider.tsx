import React, { useState, useEffect } from "react";
import { IonSpinner } from "@ionic/react";
import fbase from "../firebaseConfig";
import { Chapter } from "../models/learnModules";

export const LearnContext = React.createContext({
  chapters: [] as Chapter[]
});

export default function LearnProvider({children}:any) {
  const [chaptersState, setChaptersState] = useState<Chapter[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const rootRef = fbase.database().ref();
    const chaptersRef = rootRef.child("chapters");

    chaptersRef.once("value", (snap) => {
      const data = snap;
      data.forEach((row) => {
        const entry = row;
        setChaptersState((chapters) => [...chapters, entry.val()]);
      });
      setBusy(false);
    });
  }, []);

  return (
    <>
      {busy ? (
        <IonSpinner />
      ) : (
        <LearnContext.Provider
          value={{
            chapters: chaptersState
          }}
        >
          {children}
        </LearnContext.Provider>
      )}
    </>
  );
}