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
  IonChip,
  IonIcon,
  IonListHeader,
} from "@ionic/react";
import { UserData } from "../models/users";
import fbase, { getCurrentUser } from "../firebaseConfig";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";

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
                <IonCol size="3" style={{ position: "relative" }}>
                  <IonAvatar
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </IonCol>
                <IonCol size="9">
                  <IonText>
                    <h4>{user?.name}</h4>
                  </IonText>
                  <IonText>
                    <p>Email : {user?.email}</p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow class="socialMediaLinks">
                {/* {user?.socialLinks?.instagram ? (
                  <IonChip color="primary">
                    <IonIcon icon={logoInstagram} />
                    <IonLabel>Instagram</IonLabel>
                  </IonChip>
                ) : null}
                {user?.socialLinks?.youtube ? (
                  <IonChip color="danger">
                    <IonIcon icon={logoYoutube} />
                    <IonLabel>YouTube</IonLabel>
                  </IonChip>
                ) : null}
                {user?.socialLinks?.website ? (
                  <IonChip>
                    <IonIcon icon={globeOutline} />
                    <IonLabel>Website</IonLabel>
                  </IonChip>
                ) : null} */}
                <a
                  href="http://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IonChip color="primary">
                    <IonIcon icon={logoInstagram} />
                    <IonLabel>Instagram</IonLabel>
                  </IonChip>
                </a>
                <a
                  href="http://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IonChip color="danger">
                    <IonIcon icon={logoYoutube} />
                    <IonLabel>YouTube</IonLabel>
                  </IonChip>
                </a>
                <a
                  href="http://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IonChip>
                    <IonIcon icon={globeOutline} />
                    <IonLabel>Website</IonLabel>
                  </IonChip>
                </a>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonButton
                    expand="block"
                    size="small"
                    shape="round"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow></IonRow>
            </IonGrid>
            <IonModal onDidDismiss={() => setEditMode(false)} isOpen={editMode}>
              <div className="ion-padding">
                <IonText>
                  <h2>Edit Profile</h2>
                </IonText>
                <IonList lines="none">
                  <IonListHeader color="secondary">
                    <h5>Account Details</h5>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={user?.name} type="text" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={user?.email} type="email" />
                  </IonItem>
                </IonList>
                <IonList lines="none">
                  <IonListHeader color="tertiary">
                    <h5>Links</h5>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel position="stacked">Instagram</IonLabel>
                    <IonInput
                      type="text"
                      placeholder={"Your Instagram Username"}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">YouTube</IonLabel>
                    <IonInput type="url" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Website</IonLabel>
                    <IonInput type="url" />
                  </IonItem>
                </IonList>
                <IonButton expand="block" color="success" size="default">
                  Save
                </IonButton>
              </div>
              <IonButton onClick={() => setEditMode(false)}>Cancel</IonButton>
            </IonModal>
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
}
