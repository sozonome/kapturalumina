import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import ReactDOM from "react-dom";
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
import { updateUserLearnProgress } from "../firebase/users";
import { useLocation, withRouter } from "react-router";

// export interface Action {
//   type: string;
//   payload?: SubModule | undefined;
// }

// function reducer(state: SubModule | undefined, action: Action) {
//   switch (action.type) {
//     case "fetch":
//       return (state = action.payload);
//     case "reset":
//       return (state = undefined);
//   }
// }

const initialSlides: SubModule = {
  id: "blank",
  title: "Blank",
  slides: [
    {
      id: "slide01",
      text: "This is a Blank Module",
    },
  ],
};

function SubModulePage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);

  const [subModule, setSubModule] = useState<SubModule>();
  const [busy, setBusy] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(true);

  const [progressIndex, setProgressIndex] = useState<number>(0);

  const [alertQuiz, setAlertQuiz] = useState<boolean>(false);
  const [busyUpdate, setBusyUpdate] = useState<boolean>(false);

  // const [subModule, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    console.log("useEffect Fetch", subModule);
    const chapter = chapters.find(
      (chapter) => chapter.id === props.match.params.chapterId
    );
    if (
      chapter &&
      props.match.params.chapterId !== null &&
      props.match.params.subModuleId !== null
    ) {
      console.log("fetchh", subModule, props.match.params.subModuleId);
      // dispatch({
      //   type: "fetch",
      //   payload: chapter.subModules.find(
      //     (subModule) => subModule.id === props.match.params.subModuleId
      //   ),
      // });
      setSubModule(undefined);
      setSubModule(
        chapter.subModules.find(
          (subModule) => subModule.id === props.match.params.subModuleId
        )
      );
      setFinish(false);
    }
    setBusy(false);
  }, [props.match.params.chapterId, props.match.params.subModuleId, chapters]);

  useEffect(() => {
    // Cleanup Effect
    return () => {
      console.log("cleaned up");
      setFinish(true);
      setSubModule(undefined);
      setSubModule(undefined);
      setProgressIndex(0);
    };
  }, []);

  const slider = useRef<HTMLIonSlidesElement>(null);

  function afterRead() {
    console.log("after read");
    setBusyUpdate(true);
    if (subModule?.quiz == null) {
      updateUserLearnProgress(
        props.match.params.subModuleId,
        props.match.params.chapterId,
        1,
        true
      );
    }

    setTimeout(() => {
      console.log("timeout");
      // dispatch({
      //   type: "reset",
      // });

      setBusyUpdate(false);
      if (subModule?.quiz) {
        props.history.replace(
          `/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`
        );
      } else {
        props.history.replace(`/learn/${props.match.params.chapterId}`);
      }
      return <IonAlert isOpen={true} />;
    }, 1000);
    slider.current!.slideTo(0);
  }

  function renderSlides(subModule: SubModule) {
    return subModule.slides.map((slide, index) => {
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
    });
  }

  return (
    <IonPage>
      {console.log(
        props.match.params.chapterId,
        props.match.params.subModuleId,
        subModule,
        subModule?.slides.length,
        chapters,
        progressIndex,
        slider,
        finish
      )}
      {busy ? (
        <IonSpinner />
      ) : subModule !== undefined ? (
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
                    // routerLink={`/quiz/${props.match.params.chapterId}/${props.match.params.subModuleId}`}
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
                      {progressIndex === subModule.slides.length - 1
                        ? "Quiz"
                        : "Skip to Quiz"}
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
        // props.history.push('/')
      )}
    </IonPage>
  );
}
export default withRouter(SubModulePage);
