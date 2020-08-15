import React from "react";
import {
  IonContent,
  IonText,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";

const ErrorContent = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sorry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ marginTop: "40vh", textAlign: "center" }}>
          <IonText style={{ display: "block" }}>
            Sorry, you got to see this mess <br />
            Please wait for a while <br />
            If nothing happened after few minutes <br />
            Hit the reload button
          </IonText>
          <IonButton
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </IonButton>
          {/* <IonButton routerLink="/">Back to Home</IonButton> */}
        </div>
      </IonContent>
    </>
  );
};

export default ErrorContent;
