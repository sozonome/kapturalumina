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
          <h1>Terima Kasih</h1>
          <p>Sudah menggunakan aplikasi KapturaLumina yang dibangun untuk meraih gelar Sarjana Komputer (S.Kom.).</p>
          <p>Aplikasi ini ditujukan untuk teman-teman yang ingin belajar fotografi dengan mudah dan menyenangkan.</p>
          <p>Harapannya, teman-teman yang menggunakan aplikasi ini semakin ter-motivasi atau tertarik untuk belajar fotografi dan meningkatkan kualitas hasil karya fotografi teman-teman.</p>
          
          <hr/>
          
          <h4>Pembuatan</h4>
          <p>Aplikasi ini dibuat menggunakan :</p>
          <ul>
            <li>Ionic v5 - React</li>
            <li>Firebase</li>
          </ul>
          <h6>Aset Gambar</h6>
          <ul>
            <li>FreePik</li>
          </ul>
        </IonText>
        <hr/>
        <IonText>
          <p>
            <a href="https://agustinusnathaniel.com" target="_blank" rel="noreferrer noopener">Agustinus Nathaniel</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
}
