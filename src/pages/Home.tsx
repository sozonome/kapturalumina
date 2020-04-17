import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
} from "@ionic/react";
import React from "react";
import { camera } from "ionicons/icons";
import {
  logoutUser,
  getCurrentUserProfileName,
} from "../firebaseConfig";
import { withRouter } from "react-router";

const Home: React.FC = (props: any) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle style={{ marginTop: "12px" }}>
                Halo, {getCurrentUserProfileName()}!
              </IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={camera} /> Kamera
                  </IonCardTitle>
                  <IonCardSubtitle>
                    Pengenalan dan Pengoperasian kamera
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText></IonText>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={camera} /> Kamera
                  </IonCardTitle>
                  <IonCardSubtitle>Pengenalan Kamera</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText></IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={() => logoutUser().then(props.history.push("/login"))}
              >
                Keluar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
