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
  IonIcon,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { LearnContext } from "../components/LearnProvider";
import { Chapter } from "../models/learnModules";
import fbase from "../firebaseConfig";

export default function ChapterPage(props: any) {
  const { chapters } = useContext(LearnContext);

  const [chapter, setChapter] = useState<Chapter>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    setChapter(chapters.find((chapter) => chapter.id === props.match.params.chapterId));

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
                    <IonCardTitle>
                      {subModule.title}
                    </IonCardTitle>
                    <IonCardSubtitle>{subModule.subtitle}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonImg src={subModule.thumbnail} />
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
