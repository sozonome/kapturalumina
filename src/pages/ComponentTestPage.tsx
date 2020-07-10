import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonProgressBar,
  IonButton,
  IonIcon,
  IonCol,
} from "@ionic/react";
import { removeSharp, addSharp } from "ionicons/icons";
import shuffleSet from "../functions/shuffle";
import getCurrentDate from "../functions/getCurrentDate";
import { updateUserLeaderBoardPoints } from "../firebase/leaderboard";
import { updateUserLearnProgress } from "../firebase/users";
import randomString from "../functions/randomString";

export default function ComponentTestPage() {
  const rArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];
  const [prog, setProg] = useState(0.2);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Test Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonProgressBar color="primary" value={prog}></IonProgressBar>
              <IonButtons>
                <IonButton
                  onClick={() => setProg(prog - 0.2 <= 0 ? 0 : prog - 0.2)}
                >
                  <IonIcon icon={removeSharp} />
                </IonButton>
                <IonButton
                  onClick={() => setProg(prog + 0.2 >= 1 ? 1 : prog + 0.2)}
                >
                  <IonIcon icon={addSharp} />
                </IonButton>
              </IonButtons>
              <IonButton
                onClick={() => {
                  console.log(shuffleSet(rArray, 8));
                }}
              >
                Test Shuffle (see console.log)
              </IonButton>
              <IonButton
                onClick={() => {
                  console.log(shuffleSet(rArray));
                }}
              >
                Test Shuffle All (see console.log)
              </IonButton>
              <IonButton
                onClick={() => {
                  getCurrentDate();
                }}
              >
                Test CurrentDate
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLeaderBoardPoints(100);
                }}
              >
                Test updateleaderboard
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub01", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub01
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub02", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub02 success
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub02", "c01", 0.4, false, 5);
                }}
              >
                Test updateScoreNewScore c01sub02 faile
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub03", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub03
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub04", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub04
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub05", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub05
              </IonButton>
              <IonButton
                onClick={() => {
                  updateUserLearnProgress("c01sub06", "c01", 1, true, 5);
                }}
              >
                Test updateScoreNewScore c01sub06
              </IonButton>
              <IonButton
                onClick={() => {
                  console.log(randomString());
                }}
              >
                Test Random String
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
