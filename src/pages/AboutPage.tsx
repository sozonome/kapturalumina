import React from "react";
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

export default function AboutPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Tentang Aplikasi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      </IonContent>
    </IonPage>
  );
}
