import React from "react";
import { IonContent, IonText, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/react";

export default function ErrorContent() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Sorry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ marginTop: "45vh", textAlign: "center" }}>
          <IonText style={{ display: "block" }}>
            Sorry, you got to see this mess
          </IonText>
          <IonButton onClick={()=>{
            window.location.reload()
          }}>Reload</IonButton>
          {/* <IonButton routerLink="/">Back to Home</IonButton> */}
        </div>
      </IonContent>
    </>
  );
}
