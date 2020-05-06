import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonText,
  IonSpinner,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { LearnContext } from "../components/LearnProvider";
import { Slide, Chapter, SubModule } from "../models/learnModules";
import { camera } from "ionicons/icons";

export default function SubModulePage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    const chapter = chapters.find(
      (chapter) => chapter.id === props.match.params.chapterId
    );
    if (chapter) {
      setSubModule(
        chapter.subModules.find(
          (subModule) => subModule.id === props.match.params.subModuleId
        )
      );
    }
    setBusy(false);
  }, [chapters]);

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : subModule ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton />
              </IonButtons>
              <IonTitle>{subModule.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {subModule.slides.map((slide, index) => {
              return (
                <IonCard key={index}>
                  <IonCardHeader>
                    <IonCardTitle>{slide.title ? slide.title : null}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {slide.text ? (
                      <IonText>{slide.text}</IonText>
                    ) : null}
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonContent>
        </>
      ) : (
        <>
          <IonHeader></IonHeader>
          <IonContent>Sorry, please refresh the page</IonContent>
        </>
      )}
    </IonPage>
  );
}
