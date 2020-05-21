import React, { useState, useContext, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
  IonLoading,
} from "@ionic/react";
import { Chapter, Quiz } from "../models/chapters";
import { LearnContext } from "../components/providers/LearnProvider";
import { updateUserLearnProgress } from "../firebaseConfig";
import ErrorContent from "../components/ErrorContent";

export default function QuizPage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);
  const [score, setScore] = useState<number>(0);

  const [busy, setBusy] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<Quiz>();
  const [index, setIndex] = useState<number>(0);

  const [streak, setStreak] = useState<number>(0);

  const [busyUpdate, setBusyUpdate] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    const chapter = chapters.find(
      (chapter) => chapter.id === props.match.params.chapterId
    );
    if (chapter) {
      const subModule = chapter.subModules.find(
        (subModule) => subModule.id === props.match.params.subModuleId
      );
      if (subModule) {
        setQuiz(subModule.quiz);
      }
    }
    setBusy(false);
  },[chapters, props.match.params.chapterId, props.match.params.subModuleId]);

  useEffect(() => {
    if (finish === true) {
      updateLearnProgress();
      setFinish(false); //Re-initialize finish state
    }
  }, [finish]);

  function updateLearnProgress() {
    // Value Streak and Points
    console.log(score, index, streak);
    const newScore = score / (index + 1);
    const newStreak = streak;

    setBusyUpdate(true);

    updateUserLearnProgress(
      props.match.params.subModuleId,
      props.match.params.chapterId,
      newScore,
      newStreak
    );

    setTimeout(() => {
      setBusyUpdate(false);

      // Re-initialize states
      setScore(0);
      setIndex(0);
      setStreak(0);

      props.history.replace(`/learn/${props.match.params.chapterId}`);
    }, 2000);
  }

  return (
    <IonPage>
      {busy ? (
        <IonSpinner />
      ) : quiz ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Quiz</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonLoading message={"Mohon Tunggu..."} isOpen={busyUpdate} />
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">Skor : {score}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="ion-text-center">
                  <h3>{quiz.contents[index].question}</h3>
                </IonCol>
              </IonRow>
              <IonRow>
                {quiz.contents[index].answers.map((answer, ind) => {
                  return (
                    <IonCol key={ind} size="12">
                      <IonButton
                        class="quizAnswerButton"
                        shape="round"
                        expand="block"
                        onClick={() => {
                          if (answer.correct) {
                            setScore(score + 1);
                            setStreak(streak + 1);
                          } else {
                            setStreak(0);
                          }

                          if (index === quiz.contents.length - 1) {
                            // console.log(quiz.contents.length, index)
                            setFinish(true);
                          } else {
                            setIndex(index + 1);
                            // console.log(index, 'lah');
                          }
                        }}
                      >
                        {answer.content}
                      </IonButton>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
            {/* <IonAlert
              isOpen={alertSubmitQuiz}
              onDidDismiss={() => setAlertSubmitQuiz(false)}
              header="Quiz Selesai"
              message="Hebat! Yuk lanjutkan materi berikutnya."
              buttons={[
                {
                  text: "Lanjut",
                  handler: () =>
                    props.history.replace(
                      `/learn/${props.match.params.chapterId}`
                    ),
                },
              ]}
            /> */}
          </IonContent>
        </>
      ) : (
        <ErrorContent />
      )}
    </IonPage>
  );
}
