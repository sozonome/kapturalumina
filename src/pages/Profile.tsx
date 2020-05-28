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
  IonImg,
} from "@ionic/react";
import { UserData } from "../models/users";
import fbase from "../firebase/firebaseConfig";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";
import { getCurrentUser } from "../firebase/auth";

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
              <IonRow class="ion-padding-vertical">
                <IonCol size="3" style={{ position: "relative" }}>
                  <IonAvatar
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <IonImg src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </IonCol>
                <IonCol size="9">
                  <IonText>
                    <h4>{user?.name}</h4>
                  </IonText>
                  {/* <IonText>
                    <p>Email : {user?.email}</p>
                  </IonText> */}
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
                <IonCol size="12">
                  <IonButton
                    expand="block"
                    size="small"
                    shape="round"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profil
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ion-text-center">
                <IonCol>
                  <IonText>
                    <h3>{user?.level}</h3>
                    <p>Level</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <h3>{user?.achievements ? user.achievements.length : 0}</h3>
                    <p>Pencapaian</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <h3>{user?.friends ? user.friends.length : 0}</h3>
                    <p>Teman yang diikuti</p>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonModal
              swipeToClose={true}
              onDidDismiss={() => setEditMode(false)}
              isOpen={editMode}
            >
              <div className="ion-padding">
                <IonText>
                  <h2>Edit Profile</h2>
                </IonText>
                <IonList lines="none">
                  <IonListHeader color="secondary">
                    <h5>Detail Akun</h5>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel position="stacked">Nama</IonLabel>
                    <IonInput value={user?.name} type="text" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Alamat E-mail</IonLabel>
                    <IonInput value={user?.email} type="email" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Deskripsi diri</IonLabel>
                    <IonInput value={user?.bio} type="text" />
                  </IonItem>
                </IonList>
                <IonList lines="none">
                  <IonListHeader color="tertiary">
                    <h5>Tautan Media Sosial</h5>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel position="stacked">Instagram</IonLabel>
                    <IonInput
                      type="text"
                      placeholder={"Username Instagram Anda"}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">YouTube</IonLabel>
                    <IonInput
                      type="url"
                      placeholder="URL YouTube Channel Anda"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Website</IonLabel>
                    <IonInput type="url" placeholder="URL Website Anda" />
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
