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
  IonLabel,
  IonChip,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { UserData } from "../models/users";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";
import { getCurrentUser } from "../firebase/auth";
import { usersData } from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";

export default function Profile() {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userPoint, setPoints] = useState<number>(0);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      usersData.child(user.uid).on("value", (snap) => {
        if (snap.exists()) {
          setUser(snap.val());
          setBusy(false);
        }
      });
      leaderboard.on("value",(snap)=>{
        snap.forEach((entry)=>{
          if(entry.key === user.uid){
            setPoints(entry.val().points)
          }
        })
      })
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
                    <IonImg
                      src={"https://api.adorable.io/avatars/200/" + user?.name}
                    />
                  </IonAvatar>
                </IonCol>
                <IonCol size="9">
                  <IonText>
                    <h4>{user?.name}</h4>
                    <p>{user?.bio} </p>
                  </IonText>
                  {/* <IonText>
                    <p>Email : {user?.email}</p>
                  </IonText> */}
                </IonCol>
              </IonRow>
              <IonRow class="socialMediaLinks">
                {user?.socialLinks?.instagram ? (
                  <a
                    href={
                      "http://www.instagram.com/" + user?.socialLinks?.instagram
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IonChip color="insta">
                      <IonIcon icon={logoInstagram} />
                      <IonLabel>Instagram</IonLabel>
                    </IonChip>
                  </a>
                ) : null}

                {user?.socialLinks?.youtube ? (
                  <a
                    href={"https://youtube.com/" + user?.socialLinks?.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IonChip color="youtube">
                      <IonIcon icon={logoYoutube} />
                      <IonLabel>YouTube</IonLabel>
                    </IonChip>
                  </a>
                ) : null}

                {user?.socialLinks?.website ? (
                  <a
                    href={user?.socialLinks?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IonChip color="darkcream">
                      <IonIcon icon={globeOutline} />
                      <IonLabel>Website</IonLabel>
                    </IonChip>
                  </a>
                ) : null}
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonButton
                    expand="block"
                    size="small"
                    shape="round"
                    // onClick={() => setEditMode(true)}
                    routerLink={"/editprofile"}
                  >
                    Edit Profil
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ion-text-center">
                <IonCol>
                  <IonText>
                    <h3>{userPoint}</h3>
                    <p>Poin</p>
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
              <IonButton onClick={() => setEditMode(false)}>Cancel</IonButton>
            </IonModal>
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
}
