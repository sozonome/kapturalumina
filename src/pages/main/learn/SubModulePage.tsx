import React, { useContext, useEffect, useState, useRef } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonText,
  IonSpinner,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide,
  IonProgressBar,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonCardSubtitle,
  IonLoading,
} from "@ionic/react";
import { chevronBack, chevronForward, checkmarkCircle } from "ionicons/icons";
import { useHistory, useParams } from "react-router";

import { LearnContext } from "../../../components/providers";
import ErrorContent from "../../../components/ErrorContent";
import SubModuleSlideImage from "../../../components/SubModuleSlideImage";

import {
  updateUserLearnProgress,
  updateUserLeaderBoardPoints,
} from "../../../firebase";
import {} from "../../../firebase/leaderboard";

import { Chapter, SubModule } from "../../../models";

const SubModulePage = () => {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);

  const [progressIndex, setProgressIndex] = useState<number>(0);

  const [alertQuiz, setAlertQuiz] = useState<boolean>(false);
  const [busyUpdate, setBusyUpdate] = useState<boolean>(false);

  const history = useHistory();
  const { chapterId, subModuleId }: any = useParams();

  useEffect(() => {
    const chapter = chapters.find(
      (chapterData) => chapterData.id === chapterId
    );
    if (chapter && chapterId !== null && subModuleId !== null) {
      setSubModule(undefined);
      setSubModule(
        chapter.subModules.find(
          (subModuleData) => subModuleData.id === subModuleId
        )
      );
    }
    setBusy(false);
  }, [chapterId, subModuleId, chapters]);

  useEffect(() => {
    // Cleanup Effect
    return () => {
      setSubModule(undefined);
      setSubModule(undefined);
      setProgressIndex(0);
    };
  }, []);

  const slider = useRef<HTMLIonSlidesElement>(null);

  const afterRead = () => {
    setBusyUpdate(true);
    if (subModule?.quiz == null) {
      updateUserLearnProgress(subModuleId, chapterId, 1, true);
      if (subModule?.passingPoints) {
        updateUserLeaderBoardPoints(subModule.passingPoints);
      } else {
        updateUserLeaderBoardPoints(100);
      }
    }

    setTimeout(() => {
      setBusyUpdate(false);
      if (subModule?.quiz) {
        history.replace(`/quiz/${chapterId}/${subModuleId}`);
      } else {
        history.replace(`/learn/${chapterId}`);
      }
      return <IonAlert isOpen={true} />;
    }, 1000);
    slider.current!.slideTo(0);
  };

  const renderSlides = (subModuleContent: SubModule) => {
    return subModuleContent.slides.map((slide, index) => {
      return (
        <IonSlide key={index}>
          <IonCard>
            {slide.img ? (
              slide.img.position === "top" ? (
                <SubModuleSlideImage img={slide.img} />
              ) : null
            ) : null}
            {slide.title ? (
              <IonCardHeader>
                {slide.titleType === "big" ? (
                  <IonCardTitle>{slide.title}</IonCardTitle>
                ) : (
                  <IonCardSubtitle>{slide.title}</IonCardSubtitle>
                )}
              </IonCardHeader>
            ) : null}
            {slide.img ? (
              slide.img.position === "middle" ? (
                <SubModuleSlideImage img={slide.img} />
              ) : null
            ) : null}
            <IonCardContent>
              {slide.text ? (
                <IonText>
                  <p>{slide.text}</p>
                </IonText>
              ) : null}
            </IonCardContent>
            {slide.img ? (
              slide.img.position === "bottom" ? (
                <SubModuleSlideImage img={slide.img} />
              ) : null
            ) : null}
          </IonCard>
        </IonSlide>
      );
    });
  };

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : subModule !== undefined ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton />
              </IonButtons>
              <IonTitle>{subModule.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="subModule">
            <IonLoading message={"Mohon Tunggu..."} isOpen={busyUpdate} />
            <IonProgressBar
              style={{
                height: "16px",
              }}
              color="secondary"
              value={(progressIndex + 1) / (subModule.slides.length + 1)}
            />
            <IonSlides
              onIonSlideWillChange={(event: any) => {
                setProgressIndex(event.target.swiper.realIndex);
              }}
              ref={slider}
              style={{
                width: "100%",
                height: "85%",
                margin: "0 auto",
              }}
            >
              {renderSlides(subModule)}
            </IonSlides>

            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton
                    expand="block"
                    fill="outline"
                    onClick={() => slider.current!.slidePrev()}
                  >
                    <IonIcon slot="start" icon={chevronBack} />
                    Prev
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton
                    expand="block"
                    // routerLink={`/quiz/${chapterId}/${subModuleId}`}
                    onClick={() => {
                      if (progressIndex === subModule.slides.length - 1) {
                        if (subModule.quiz) {
                          setAlertQuiz(true);
                        } else {
                          afterRead();
                        }
                      } else {
                        slider.current!.slideNext();
                      }
                    }}
                  >
                    {progressIndex === subModule.slides.length - 1 ? (
                      <>
                        Selesai
                        <IonIcon slot="end" icon={checkmarkCircle} />
                      </>
                    ) : (
                      <>
                        Next
                        <IonIcon slot="end" icon={chevronForward} />
                      </>
                    )}
                  </IonButton>
                </IonCol>
              </IonRow>
              {subModule.quiz ? (
                <IonRow>
                  <IonCol size="12">
                    <IonButton
                      expand="block"
                      onClick={() => {
                        setAlertQuiz(true);
                      }}
                    >
                      {progressIndex === subModule.slides.length - 1
                        ? "Quiz"
                        : "Lewati langsung ke Quiz"}
                    </IonButton>
                  </IonCol>
                </IonRow>
              ) : null}
            </IonGrid>
            <IonAlert
              isOpen={alertQuiz}
              onDidDismiss={() => setAlertQuiz(false)}
              header="Uji Pemahamanmu"
              message="Untuk menyimpan kemajuan belajarmu, kerjakan Quiz terlebih dahulu"
              buttons={[
                {
                  text: "Kembali",
                  role: "cancel",
                },
                {
                  text: "Kerjakan Quiz",
                  handler: () => {
                    afterRead();
                  },
                },
              ]}
            />
          </IonContent>
        </>
      ) : (
        <ErrorContent />
      )}
    </IonPage>
  );
};
export default SubModulePage;
