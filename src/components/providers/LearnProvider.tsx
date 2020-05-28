import React, { useState, useEffect } from "react";
import fbase from "../../firebaseConfig";
import { Chapter } from "../../models/chapters";
import Loader from "../Loader";

export const LearnContext = React.createContext({
  chapters: [] as Chapter[]
});

export default function LearnProvider({children}:any) {
  const [chaptersState, setChaptersState] = useState<Chapter[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    // let fetched = true;
    fbase.auth().onAuthStateChanged(()=>{
      const rootRef = fbase.database().ref();
      const chaptersRef = rootRef.child("chapters");
      setChaptersState([]);
      // if(fetched){
        chaptersRef.once("value", (snap) => {
          const data = snap;
          data.forEach((row) => {
            const entry = row;
            setChaptersState((chapters)=> [...chapters, entry.val()]);
          });
        });
      // }
      setBusy(false);
      // return fetched = false;
    })
  }, []);

  return (
    <>
    {/* {console.log("LearnProvider", chaptersState)} */}
      {busy ? (
        <Loader />
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