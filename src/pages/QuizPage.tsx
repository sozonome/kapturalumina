import React, { useState, useContext, useEffect } from "react";
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle, IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { Chapter, Quiz } from "../models/learnModules";
import { LearnContext } from "../components/LearnProvider";

export default function QuizPage(props: any) {
  const { chapters }: { chapters: Chapter[] } = useContext(LearnContext);
  const [score, setScore] = useState<number>(0);

  const [busy, setBusy] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<Quiz>();

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Quiz
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
              Skor : {score}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="ion-text-center">
              <h3>Question</h3>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block">1</IonButton>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block">2</IonButton>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block">3</IonButton>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block">4</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
