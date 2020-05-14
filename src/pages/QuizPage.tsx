import React, { useState, useContext, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
  IonAlert,
} from "@ionic/react";
import { Chapter, Quiz } from "../models/learnModules";
import { LearnContext } from "../components/LearnProvider";

export default function QuizPage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);
  const [score, setScore] = useState<number>(0);

  const [busy, setBusy] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<Quiz>();
  const [index, setIndex] = useState<number>(0);

  const [streak, setStreak] = useState<number>(0);

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
  }, [chapters, props.match.params.chapterId, props.match.params.subModuleId]);

  function updateLearnProgress() {
    // Value Streak and Points
    const newScore = score;
    const newStreak = streak;
    
    props.history.replace(`/learn/${props.match.params.chapterId}`);
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
                {quiz.contents[index].answers.map((answer, index) => {
                  return (
                    <IonCol key={index} size="12">
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
                          
                          if (index < quiz.contents.length - 1) {
                            setIndex(index + 1);
                            console.log(index, 'lah');
                          } else {
                            updateLearnProgress();
                            console.log('loh')
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
        <>
          <IonHeader></IonHeader>
          <IonContent>Maaf, coba </IonContent>
        </>
      )}
    </IonPage>
  );
}
