import React, { useContext } from "react";
import {
  IonContent,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonPage,
  IonButton,
} from "@ionic/react";
import { Redirect } from "react-router";

import { AuthContext } from "../components/providers/AuthProvider";
import PublicHomeSlide from "../components/PublicHomeSlide";

const PublicPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>KapturaLumina</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="publicHome">
        <PublicHomeSlide />
        <div>
          <IonButton
            shape="round"
            routerLink="/login"
            color="secondary"
            expand="block"
          >
            Masuk
          </IonButton>
          <IonButton
            shape="round"
            routerLink="/register"
            color="success"
            expand="block"
          >
            Daftar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PublicPage;
