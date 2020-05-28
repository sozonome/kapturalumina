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
import { LearnContext } from "../components/providers/LearnProvider";
import { Chapter, SubModule } from "../models/chapters";
import { chevronBack, chevronForward } from "ionicons/icons";
import ErrorContent from "../components/ErrorContent";
import SubModuleSlideImage from "../components/SubModuleSlideImage";
import { updateUserLearnProgress } from "../firebaseConfig";

export default function SubModulePage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);

  const [progressIndex, setProgressIndex] = useState<number>(0);

  const [alertQuiz, setAlertQuiz] = useState<boolean>(false);
  const [busyUpdate, setBusyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const chapter = chapters.find(
      (chapter) => chapter.id === props.match.params.chapterId
    );
    if (chapter) {
      setSubModule(
        chapter.subModules.find(
          (subModule) => subModule.id === props.match.params.subModuleId
        )
      );
    }
    setBusy(false);
  }, [chapters, props.match.params.chapterId, props.match.params.subModuleId]);

  const slider = useRef(null as any);

  function afterRead() {
    setProgressIndex(0);
    if (subModule?.quiz) {
      props.history.push(
        `/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`
      );
    } else {
      setBusyUpdate(true);
      updateUserLearnProgress(
        props.match.params.subModuleId,
        props.match.params.chapterId,
        1
      );
      // setBusyUpdate(false);
      // props.history.replace(`/learn/${props.match.params.chapterId}`);

      setTimeout(() => {
        setBusyUpdate(false);

        props.history.replace(`/learn/${props.match.params.chapterId}`);
      }, 1000);
    }
    slider.current.slideTo(0);
  }

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : subModule ? (
        <>
          {/* <Prompt message="Apakah anda yakin?" /> */}
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
              color="primary"
              value={(progressIndex + 1) / (subModule.slides.length + 1)}
            />
            <IonSlides
              onIonSlideWillChange={(event: any) => {
                setProgressIndex(event.target.swiper.realIndex);
              }}
              ref={slider}
              style={{
                width: "100%",
                height: "80%",
                margin: "0 auto",
              }}
            >
              {subModule.slides.map((slide, index) => {
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
                        {/* {slide.img ? <IonImg src={slide.img.url} /> : null} */}
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
              })}
            </IonSlides>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton
                    expand="block"
                    fill="outline"
                    onClick={() => slider.current.slidePrev()}
                  >
                    <IonIcon slot="start" icon={chevronBack} />
                    Prev
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton
                    expand="block"
                    // routerLink={`/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`}
                    onClick={() => {
                      if (progressIndex === subModule.slides.length - 1) {
                        if (subModule.quiz) {
                          setAlertQuiz(true);
                        } else {
                          afterRead();
                        }
                      } else {
                        slider.current.slideNext();
                      }
                    }}
                  >
                    Next
                    <IonIcon slot="end" icon={chevronForward} />
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
                      Skip to Quiz
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
}
