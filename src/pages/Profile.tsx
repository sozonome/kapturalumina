import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonGrid,
  IonRow,
  IonAvatar,
  IonLoading,
  IonCol,
} from "@ionic/react";
import { UserData } from "../models/users";
import fbase, { getCurrentUser } from "../firebaseConfig";

export default function Profile() {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      fbase
        .database()
        .ref("users/" + user.uid)
        .on("value", (snap) => {
          if (snap) {
            setUser(snap.val());
            setBusy(false);
          }
        });
    } else {
      setTimeout(() => {
        setBusy(false);
      }, 10000);
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {busy ? (
        <IonLoading isOpen={busy} />
      ) : user !== null ? (
        <>
          <IonContent>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Profil</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonGrid>
              <IonRow class="ion-padding">
                <IonCol>
                  <IonTitle>{user?.name}</IonTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
}
