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
  IonCardSubtitle,
  IonAlert,
  IonImg,
} from "@ionic/react";
import { LearnContext } from "../components/LearnProvider";
import { Chapter, SubModule } from "../models/learnModules";
import Swiper from "swiper";
import { chevronBack, chevronForward, camera } from "ionicons/icons";
// import { Prompt } from "react-router";

export default function SubModulePage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);

  const [progressIndex, setProgressIndex] = useState<number>(0);

  const [alertQuiz, setAlertQuiz] = useState<boolean>(false);

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

  const slider = useRef(Swiper as any);

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
              <IonTitle>
                {subModule.title} <IonIcon name={chevronBack} />
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
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
                height: "90%",
                margin: "0 auto",
              }}
            >
              {subModule.slides.map((slide, index) => {
                return (
                  <IonSlide key={index}>
                    <IonCard>
                      {slide.title ? (
                        <IonCardHeader>
                          <IonCardTitle>{slide.title}
                          </IonCardTitle>
                        </IonCardHeader>
                      ) : null}
                      <IonCardContent>
                        {slide.img ? <IonImg src={slide.img} /> : null}
                        {slide.text ? <IonText>{slide.text}</IonText> : null}
                      </IonCardContent>
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
                    <IonIcon slot="start" name={chevronBack} />
                    Prev
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  {progressIndex === subModule.slides.length - 1 ? (
                    <IonButton
                      expand="block"
                      // routerLink={`/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`}
                      onClick={() => setAlertQuiz(true)}
                    >
                      Next
                      <IonIcon slot="end" name={chevronForward} />
                    </IonButton>
                  ) : (
                    <IonButton
                      expand="block"
                      onClick={() => slider.current.slideNext()}
                    >
                      Next
                      <IonIcon slot="end" name={chevronForward} />
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
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
                  handler: () =>
                    props.history.push(
                      `/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`
                    ),
                },
              ]}
            />
          </IonContent>
        </>
      ) : (
        <>
          <IonHeader></IonHeader>
          <IonContent>Maaf, coba </IonContent>
        </>
      )}
    </IonPage>
  );
}
