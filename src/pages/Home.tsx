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
  IonImg,
} from "@ionic/react";
import React, { useContext } from "react";
import { camera } from "ionicons/icons";
import { getCurrentUserProfileName } from "../firebaseConfig";
import { withRouter } from "react-router";
import { LearnContext } from "../components/LearnProvider";

const Home: React.FC = () => {
  const { chapters } = useContext(LearnContext);

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
              {chapters.map((chapter, index) => {
                return (
                  <IonCard key={index} routerLink={`/learn/${chapter.id}`}>
                    <IonCardHeader>
                      <IonCardTitle>
                        <IonIcon icon={camera} /> {chapter.title}
                      </IonCardTitle>
                      <IonCardSubtitle>{chapter.subtitle}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonImg src={chapter.thumbnail} />
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
