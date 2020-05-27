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
import fbase, {
  getCurrentUserProfileName,
  getCurrentUser,
} from "../firebaseConfig";
import { withRouter } from "react-router";
import { LearnContext } from "../components/providers/LearnProvider";
import { Progress } from "../models/users";
import useIsMountedRef from "../functions/useIsMountedRef";

const Home: React.FC = () => {
  const { chapters } = useContext(LearnContext);
  const [userDisplayName, setUserDisplayName] = useState<string>();
  const [busy, setBusy] = useState<boolean>(true);
  const [progress, setProgress] = useState<Progress[]>([]);

  const [tempProgress, setTempProgress] = useState([]);

  const isMountedRef = useIsMountedRef();

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
  }, []);

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
          <IonContent id="homePage">
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
                {chapters.map((chapter, index) => {
                  let chapterProgress = 0;
                  let locked = index === 0 ? false : true;
                  progress.map((prog) => {
                    if (prog.chapterId === chapter.id) {
                      chapterProgress++;
                    }
                  });
                  // console.log(chapterProgress, chapter.id)
                  // console.log(chapter.id, chapterProgress, chapter.subModules.length)
                  return (
                    <IonCol sizeXs="12" sizeSm="6" sizeXl="4" key={index}>
                      <IonCard
                        disabled={locked}
                        routerLink={`/learn/${chapter.id}`}
                      >
                        <IonCardHeader>
                          <IonCardTitle>{chapter.title}</IonCardTitle>
                          <IonCardSubtitle>{chapter.subtitle}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonImg src={chapter.thumbnail} />
                          <IonText>Progress :</IonText>
                          <IonProgressBar
                            color={"secondary"}
                            value={chapterProgress / chapter.subModules.length}
                          />
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default withRouter(Home);
