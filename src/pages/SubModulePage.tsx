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
  useIonViewWillLeave,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  IonAlert,
} from "@ionic/react";
import { LearnContext } from "../components/LearnProvider";
import { Slide, Chapter, SubModule } from "../models/learnModules";
import { camera } from "ionicons/icons";
import { Prompt } from "react-router";

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

  useIonViewWillLeave(() => {
    // await new Promise((resolve, reject) => {
    //   const alert = document.createElement("ion-alert");
    //   alert.header = "Confirm!";
    //   alert.message = "Message <strong>text</strong>!!!";
      
    //   alert.buttons = [
    //     {
    //       text: "Cancel",
    //       role: "cancel",
    //       cssClass: "secondary",
    //       handler: reject,
    //     },
    //     {
    //       text: "Okay",
    //       handler: resolve,
    //     },
    //   ];

    //   document.body.appendChild(alert);
    //   return alert.present();
    // });
    console.log('ion view will leave')
  });

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : subModule ? (
        <>
          <Prompt message="Apakah anda yakin?" />
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
                    <IonCardTitle>
                      {slide.title ? slide.title : null}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {slide.text ? <IonText>{slide.text}</IonText> : null}
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
