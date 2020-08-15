import React from "react";
import { IonApp, IonPage, IonContent, IonSpinner, IonText } from "@ionic/react";

const Loader = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div
            style={{
              paddingTop: "45vh",
              textAlign: "center",
            }}
          >
            <IonSpinner
              style={{
                display: "block",
                margin: "auto",
              }}
              name="dots"
            />
            <IonText>Mohon Tunggu</IonText>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Loader;
