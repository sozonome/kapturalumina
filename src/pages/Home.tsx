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
  IonText,
  IonProgressBar,
} from "@ionic/react";
import React, { useContext, useState, useEffect } from "react";
import { camera } from "ionicons/icons";
import fbase, { getCurrentUserProfileName, getCurrentUser } from "../firebaseConfig";
import { withRouter } from "react-router";
import { LearnContext } from "../components/providers/LearnProvider";
import { Progress } from "../models/users";

const Home: React.FC = () => {
  const { chapters } = useContext(LearnContext);
  const [userDisplayName, setUserDisplayName] = useState<string>();
  const [busy, setBusy] = useState<boolean>(true);
  const [progress, setProgress] = useState<Progress[]>([])

  useEffect(() => {
    const userDName = getCurrentUserProfileName();
    if (userDName) {
      setUserDisplayName(userDName);
    }

    const user = getCurrentUser();
    if (user) {
      fbase
        .database()
        .ref("users/" + user.uid + "/progress")
        .on("value", (snapshot) => {
          snapshot.forEach((row) => {
            setProgress((prog) => [...prog, row.val()]);
          });
        });
    }

    setBusy(false);
  },[]);

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
                <IonCol class="chapterList">
                  {chapters.map((chapter, index) => {
                    let chapterProgress = 0;
                    progress.map((prog)=>{
                      if(prog.chapterId === chapter.id){
                        chapterProgress++;
                      }
                    })
                    return (
                      <IonCard key={index} routerLink={`/learn/${chapter.id}`}>
                        <IonCardHeader>
                          <IonCardTitle>{chapter.title}</IonCardTitle>
                          <IonCardSubtitle>{chapter.subtitle}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonImg src={chapter.thumbnail} />
                          <IonText>
                            Progress :
                          </IonText>
                          <IonProgressBar color={'secondary'} value={chapterProgress / chapter.subModules.length} />
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
