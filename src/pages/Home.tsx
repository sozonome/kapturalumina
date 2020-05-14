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
  IonLoading,
} from "@ionic/react";
import React, { useContext, useState, useEffect } from "react";
import { camera } from "ionicons/icons";
import { getCurrentUserProfileName } from "../firebaseConfig";
import { withRouter } from "react-router";
import { LearnContext } from "../components/LearnProvider";

const Home: React.FC = () => {
  const { chapters } = useContext(LearnContext);
  const [userDisplayName, setUserDisplayName] = useState<string>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    const userDName = getCurrentUserProfileName();
    if (userDName) {
      setUserDisplayName(userDName);
    }
    setBusy(false);
  });

  return (
    <IonPage>
      {busy ? (
        <IonLoading isOpen={busy} translucent={true} />
      ) : (
        <>
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
                    Halo, {userDisplayName ? userDisplayName : null}!
                  </IonTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {chapters.map((chapter, index) => {
                    return (
                      <IonCard key={index} routerLink={`/learn/${chapter.id}`}>
                        <IonCardHeader>
                          <IonCardTitle>{chapter.title}</IonCardTitle>
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
        </>
      )}
    </IonPage>
  );
};

export default withRouter(Home);
