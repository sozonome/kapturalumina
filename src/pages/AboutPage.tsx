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
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { logoIonic, logoReact, logoFirebase, person } from "ionicons/icons";

import { StaticAssetsAmico } from "../assets";

const AboutPage = () => {
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
        <IonGrid class="aboutPage">
          <IonRow>
            <IonCol style={{ margin: "0 auto", maxWidth: "300px" }}>
              <img className="glowFilter" src={StaticAssetsAmico} alt="" />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonText>
          <h1>Terima Kasih</h1>
          <p>
            Sudah menggunakan aplikasi KapturaLumina yang dibangun untuk meraih
            gelar Sarjana Komputer (S.Kom.).
          </p>
          <p>
            Aplikasi ini ditujukan untuk teman-teman yang ingin belajar
            fotografi dengan mudah dan menyenangkan.
          </p>
          <p>
            Harapannya, teman-teman yang menggunakan aplikasi ini semakin
            ter-motivasi atau tertarik untuk belajar fotografi dan meningkatkan
            kualitas hasil karya fotografi teman-teman.
          </p>

          <hr />

          <h4>Pembuatan Aplikasi</h4>
          <p>
            <IonIcon icon={logoIonic} size="large" />
            <IonIcon icon={logoReact} size="large" />
            <IonIcon icon={logoFirebase} size="large" />
          </p>
          <p>Aplikasi ini dibangun menggunakan Ionic, React, dan Firebase.</p>
          <h6>Aset Gambar</h6>
          <ul>
            <li>FreePik</li>
            <li>Unsplash</li>
            <li>WikiPedia</li>
            <li>Adorable Avatars</li>
          </ul>
          <h6>Referensi Materi / Panduan Pembelajaran</h6>
          <ul>
            <li>Situs PhotographyLife.com</li>
          </ul>
        </IonText>
        <hr />
        <IonText>
          <p>
            <IonIcon icon={person} />
            {"  "}
            <a
              href="https://agustinusnathaniel.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Agustinus Nathaniel
            </a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
