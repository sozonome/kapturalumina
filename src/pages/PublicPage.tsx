import React, { useContext } from "react";
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
} from "@ionic/react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../components/providers/AuthProvider";

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
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Welcome</IonCardTitle>
                  <IonCardSubtitle>Let's Learn Photography!</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton
                    routerLink="/login"
                    color="secondary"
                    expand="block"
                  >
                    Masuk
                  </IonButton>
                  <IonButton
                    routerLink="/register"
                    color="success"
                    expand="block"
                  >
                    Daftar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(PublicPage);
