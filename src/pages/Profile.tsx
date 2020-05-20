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
  IonText,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { UserData } from "../models/users";
import fbase, { getCurrentUser } from "../firebaseConfig";

export default function Profile() {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);

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
              <IonRow>
                <IonCol size="8">
                  <IonText>
                    <h4>{user?.name}</h4>
                  </IonText>
                  <IonText>
                    <p>Email : {user?.email}</p>
                  </IonText>
                </IonCol>
                <IonCol size="4" style={{ paddingTop: "10%" }}>
                  <IonButton
                    size="small"
                    shape="round"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow></IonRow>
            </IonGrid>
            <IonModal
              // swipeToClose={true}
              onDidDismiss={() => setEditMode(false)}
              isOpen={editMode}
            >
              <div className="ion-padding">
                <IonText>
                  <h2>Edit Profile</h2>
                </IonText>
                <IonList lines="none">
                  <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={user?.name} type="text" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={user?.email} type="text" />
                  </IonItem>
                  <IonButton expand="block" color="success" size="default">Save</IonButton>
                </IonList>
              </div>
              <IonButton onClick={() => setEditMode(false)}>Cancel</IonButton>
            </IonModal>
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
}
