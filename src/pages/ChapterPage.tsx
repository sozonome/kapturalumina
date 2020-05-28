import React, { useEffect, useContext, useState, useRef } from "react";
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
import fbase, { getCurrentUser } from "../firebaseConfig";
import { Progress } from "../models/users";
import { playCircle, checkmarkCircle } from "ionicons/icons";
import ErrorContent from "../components/ErrorContent";
import { UserProgressContext } from "../components/providers/ProgressProvider";

// function useIsMountedRef() {
//   const isMountedRef = useRef(null as any);
//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => {
//       isMountedRef.current = false;
//     };
//   });
//   return isMountedRef;
// }

export default function ChapterPage(props: any) {
  const { chapters } = useContext(LearnContext);
  const { progress} = useContext(UserProgressContext);

  const [chapter, setChapter] = useState<Chapter>();
  const [busy, setBusy] = useState<boolean>(true);
  const [learnProgress, setLearnProgress] = useState<Progress[]>([]);

  useEffect(() => {
    setChapter(
      chapters.find((chapter) => chapter.id === props.match.params.chapterId)
    );
    setLearnProgress(progress);
    setBusy(false);
  }, [chapters, progress, props.match.params.chapterId]);

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : chapter ? (
        <>
          {/* {console.log(learnProgress)} */}
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton />
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
                  learnProgress.map((progress, i) => {
                    if (
                      progress.chapterId === chapter.id &&
                      progress.subModuleId === chapter.subModules[index].id
                    ) {
                      bestScore = progress.score;
                    }
                    if (index > 0) {
                      if (
                        progress.subModuleId ===
                        chapter.subModules[index - 1].id
                      ) {
                        locked = false;
                      }
                    }
                  });
                  return (
                    <IonCol sizeXs="12" sizeSm="6" sizeXl="4" key={index}>
                      <IonCard
                        disabled={locked}
                        routerLink={`/learn/${chapter.id}/${subModule.id}`}
                      >
                        <IonCardHeader>
                          <IonCardTitle>{subModule.title}</IonCardTitle>
                          <IonCardSubtitle>
                            {subModule.subtitle}
                          </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonImg src={subModule.thumbnail} />

                          {bestScore !== null ? (
                            <IonText>
                              <h3>
                                <IonIcon
                                  icon={checkmarkCircle}
                                  color="success"
                                  size="large"
                                />{" "}
                                Best Score : {bestScore * 100}%
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
