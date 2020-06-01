import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonText,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { LearnContext } from "../components/providers/LearnProvider";
import { Chapter } from "../models/chapters";
import { playCircle, checkmarkCircle, reloadCircle } from "ionicons/icons";
import ErrorContent from "../components/ErrorContent";
import { UserProgressContext } from "../components/providers/ProgressProvider";
import { withRouter } from "react-router";

function ChapterPage(props: any) {
  const { chapters } = useContext(LearnContext);
  const { progress } = useContext(UserProgressContext);

  const [chapter, setChapter] = useState<Chapter>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    setChapter(
      chapters.find((chapter) => chapter.id === props.match.params.chapter__id)
    );
    setBusy(false);
  }, [chapters, progress, props.match.params.chapter__id]);

  return (
    <IonPage>
      {/* {console.log("back to chapter")} */}
      {busy ? (
        <IonSpinner />
      ) : chapter ? (
        <>
          {/* {console.log(learnProgress)} */}
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton />
                {/* <IonButton routerLink="/">
                  <IonIcon icon={arrowBackOutline} />
                </IonButton> */}
              </IonButtons>
              <IonTitle>{chapter.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="ion-padding">
            <IonGrid>
              <IonRow>
                {chapter.subModules.map((subModule, index) => {
                  let bestScore = null;
                  let locked = index === 0 ? false : true;
                  let passed = false;
                  progress.map((progress, i) => {
                    if (
                      progress.chapterId === chapter.id &&
                      progress.subModuleId === chapter.subModules[index].id
                    ) {
                      bestScore = progress.score;
                      passed = progress.passed;
                    }
                    if (index > 0) {
                      if (
                        progress.subModuleId ===
                          chapter.subModules[index - 1].id &&
                        progress.passed === true
                      ) {
                        locked = false;
                      }
                    }
                  });
                  return (
                    <IonCol
                      class="ion-align-items-center"
                      sizeXs="12"
                      sizeSm="6"
                      sizeXl="4"
                      key={index}
                    >
                      <IonCard
                        disabled={locked}
                        routerLink={`/learn/${chapter.id}/${subModule.id}`}
                      >
                        <img src={subModule.thumbnail} />
                        <IonCardHeader>
                          <IonCardTitle>{subModule.title}</IonCardTitle>
                          <IonCardSubtitle>
                            {subModule.subtitle}
                          </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          {bestScore !== null ? (
                            <IonText class="">
                              <h3 style={{ verticalAlign: "middle" }}>
                                {passed ? (
                                  <IonIcon
                                    icon={checkmarkCircle}
                                    color="success"
                                    size="large"
                                  />
                                ) : (
                                  <IonIcon
                                    icon={reloadCircle}
                                    color="warning"
                                    size="large"
                                  />
                                )}
                                {subModule.quiz ? (
                                  <>
                                    Best Score : {bestScore * 100}%
                                    {passed
                                      ? null
                                      : "Dapatkan skor kuis yang lebih baik untuk membuka modul berikutnya."}
                                  </>
                                ) : null}
                              </h3>
                            </IonText>
                          ) : (
                            <IonIcon
                              icon={playCircle}
                              color="primary"
                              size="large"
                            />
                          )}
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      ) : (
        <ErrorContent />
      )}
    </IonPage>
  );
}

export default withRouter(ChapterPage);
