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
import { withRouter } from "react-router";
import { LearnContext } from "../components/providers/LearnProvider";
import { UserProgressContext } from "../components/providers/ProgressProvider";
import { UserProfileContext } from "../components/providers/UserProfileProvider";
import { HelloRafiki } from "../assets/assetsref";

const Home: React.FC = () => {
  const { chapters } = useContext(LearnContext);
  const { progress } = useContext(UserProgressContext);
  const { user } = useContext(UserProfileContext);

  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    setBusy(false);
  }, [user]);

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
                    Halo, {user.name}!
                  </IonTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="headerImage">
                  <img src={HelloRafiki} />
                </IonCol>
              </IonRow>
              <IonRow>
                {chapters.map((chapter, index) => {
                  let chapterProgress = 0;
                  let prevChapterProgress = 0;
                  let locked = index === 0 ? false : true;
                  progress.map((prog) => {
                    if (prog.chapterId === chapter.id) {
                      chapterProgress++;
                    }
                    if (index > 0) {
                      if (chapters[index - 1].id === prog.chapterId) {
                        prevChapterProgress++;
                      }
                      if (
                        prevChapterProgress ===
                        chapters[index - 1].subModules.length
                      ) {
                        locked = false;
                      }
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
                        <img src={chapter.thumbnail} />
                        <IonCardHeader>
                          <IonCardTitle>{chapter.title}</IonCardTitle>
                          <IonCardSubtitle>{chapter.subtitle}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonText>Progress :</IonText>
                          <IonProgressBar
                            color={
                              chapterProgress / chapter.subModules.length > 0.5
                                ? "primary"
                                : "secondary"
                            }
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
