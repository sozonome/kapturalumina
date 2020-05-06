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
  withIonLifeCycle,
  IonImg,
} from "@ionic/react";
import React, { useEffect, Component, useState, useContext } from "react";
import { camera } from "ionicons/icons";
import fbase, {
  logoutUser,
  getCurrentUserProfileName,
} from "../firebaseConfig";
import { withRouter } from "react-router";
import { Chapter } from "../models/learnModules";
import { Link } from "react-router-dom";
import LearnProvider, { LearnContext } from "../components/LearnProvider";

const Home: React.FC = (props: any) => {
  // const [chapters, setChapters] = useState<Chapter[]>([]);

  // useEffect(() => {
  //   const rootRef = fbase.database().ref();
  //   const chaptersRef = rootRef.child("chapters");

  //   chaptersRef.once("value", (snap) => {
  //     const data = snap;
  //     data.forEach((row) => {
  //       const entry = row;
  //       setChapters((chapters) => [...chapters, entry.val()]);
  //     });
  //   });
  // }, []);
  const {chapters} = useContext(LearnContext);

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
                      <IonCardSubtitle>
                        {chapter.subtitle}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonImg src={chapter.thumbnail} />
                    </IonCardContent>
                  </IonCard>
                );
              })}
              {/* <IonCard>
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
                </IonCard> */}
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
