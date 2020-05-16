import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonText,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonProgressBar,
} from "@ionic/react";
import { LearnContext } from "../components/providers/LearnProvider";
import { Chapter } from "../models/chapters";
import fbase, { getCurrentUser } from "../firebaseConfig";
import { Progress } from "../models/users";

export default function ChapterPage(props: any) {
  const { chapters } = useContext(LearnContext);

  const [chapter, setChapter] = useState<Chapter>();
  const [busy, setBusy] = useState<boolean>(true);
  const [learnProgress, setLearnProgress] = useState<Progress[]>([]);

  useEffect(() => {
    setChapter(
      chapters.find((chapter) => chapter.id === props.match.params.chapterId)
    );

    const user = getCurrentUser();
    if (user) {
      fbase
        .database()
        .ref("users/" + user.uid + "/progress")
        .on("value", (snapshot) => {
          snapshot.forEach((row) => {
            setLearnProgress((progress) => [...progress, row.val()]);
          });
        });
    }

    setBusy(false);
  }, [chapters, props.match.params.chapterId]);

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : chapter ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton />
              </IonButtons>
              <IonTitle>{chapter.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {chapter.subModules.map((subModule, index) => {
              return (
                <IonCard
                  key={index}
                  routerLink={`/learn/${chapter.id}/${subModule.id}`}
                >
                  <IonCardHeader>
                    <IonCardTitle>{subModule.title}</IonCardTitle>
                    <IonCardSubtitle>{subModule.subtitle}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonImg src={subModule.thumbnail} />
                    <IonText>
                      Best Score : 
                      {learnProgress.map((progress, i) => {
                        if (
                          progress.chapterId === chapter.id &&
                          progress.subModuleId === chapter.subModules[index].id
                        ) {
                          return <IonProgressBar key={i} value={progress.score} />;
                        }
                      })}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonContent>
        </>
      ) : (
        <>
          <IonHeader></IonHeader>
          <IonContent>
            <IonText>Something's Wrong</IonText>
          </IonContent>
        </>
      )}
    </IonPage>
  );
}
