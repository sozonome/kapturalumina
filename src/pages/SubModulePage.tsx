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
} from "@ionic/react";
import { LearnContext } from "../components/LearnProvider";
import { Chapter, SubModule } from "../models/learnModules";
import Swiper, { SelectableElement } from "swiper";
import { chevronBack, chevronForward } from "ionicons/icons";
// import { Prompt } from "react-router";

export default function SubModulePage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);

  const [progressIndex, setProgressIndex] = useState<number>(0);

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
              <IonTitle>{subModule.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonProgressBar
              color="primary"
              value={(progressIndex + 1) / (subModule.slides.length + 1)}
            />
            <IonSlides
              onIonSlideWillChange={(event:any) => {
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
                      <IonCardHeader>
                        <IonCardTitle>
                          {slide.title ? slide.title : null}
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {slide.text ? <IonText>{slide.text}</IonText> : null}
                      </IonCardContent>
                    </IonCard>
                  </IonSlide>
                );
              })}
            </IonSlides>
            <IonButtons>
              <IonButton onClick={() => slider.current.slidePrev()}>
                {/* <IonIcon name={chevronBack}/> */}
                Prev
              </IonButton>
              <IonButton onClick={() => slider.current.slideNext()}>
                {/* <IonIcon name={chevronForward} /> */}
                Next
              </IonButton>
            </IonButtons>
          </IonContent>
        </>
      ) : (
        <>
          <IonHeader></IonHeader>
          <IonContent>Sorry, please refresh the page</IonContent>
        </>
      )}
    </IonPage>
  );
}
