import React from "react";
import { IonContent, IonText, IonButton } from "@ionic/react";

export default function ErrorContent() {
  return (
    <IonContent>
      <div style={{ marginTop: "45vh", textAlign: "center" }}>
        <IonText style={{display: 'block'}}>Sorry, you got to see this mess</IonText>
        <IonButton routerLink="/">Back to Home</IonButton>
      </div>
    </IonContent>
  );
}
