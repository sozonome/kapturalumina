import React, { useContext, useRef, useEffect } from "react";
import {
  IonContent,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonSlides,
  IonSlide,
  IonText,
} from "@ionic/react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../components/providers/AuthProvider";
import Swiper from "swiper";
import PublicHomeSlide from "../components/PublicHomeSlide";

function PublicPage() {
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
      <IonContent id="publicHome" style={{display:'flex', flexWrap:'wrap', minHeight:'100vh'}}>
        <PublicHomeSlide />
        <div style={{alignSelf:'flex-end'}}>
        <IonButton routerLink="/login" color="secondary" expand="block">
          Masuk
        </IonButton>
        <IonButton routerLink="/register" color="success" expand="block">
          Daftar
        </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(PublicPage);
