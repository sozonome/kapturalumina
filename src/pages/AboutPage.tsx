import React from "react";
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonText,
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
        <IonText>
          <h1>KapturaLumina</h1>
          <p>
            Aplikasi ini dibuat untuk membantu mempelajari fotografi dasar,
            khususnya bagi para fotografer pemula.
          </p>
        </IonText>
        {/* <IonText>
          <h3>Referensi Materi Pembelajaran : </h3>
          <ul>
            <li>7 Hari</li>
          </ul>
        </IonText> */}
        <IonText>
          <h4>Agustinus Nathaniel - 2020</h4>
        </IonText>
      </IonContent>
    </IonPage>
  );
}
