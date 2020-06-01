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
  IonCard,
  IonCardContent,
  IonBadge,
} from "@ionic/react";
import { UserData } from "../models/users";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";
import { getCurrentUser } from "../firebase/auth";
import { usersData } from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";
import { achievements } from "../firebase/achievements";
import { Achievement } from "../models/achievements";
import { Leaderboard } from "../models/leaderboards";
import AchievementsWrapper from "../components/AchievementsWrapper";
import AchievementModal from "../components/AchievementModal";

export default function Profile() {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);

  const [openAchievement, setOpenAchievement] = useState<boolean>(false);
  const [viewAchievement, setViewAchievement] = useState<Achievement>();

  const [friendsFollowedNumber, setFriendsFollowedNumber] = useState<number>(0);

  const [userAchievement, setUserAchievement] = useState<Achievement[]>([]);
  const [userAchievementList, setUserAchievementList] = useState<any[]>([]);
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      usersData.child(currentUser.uid).on("value", (snap) => {
        let userAchievements: Achievement[] = [];
        let userAchievementList: any[] = [];
        setBusy(true);
        if (snap.exists()) {
          setUser(snap.val());
          snap.child("achievements").forEach((userAchievement) => {
            achievements
              .once("value", (snapAchievement) => {
                snapAchievement.forEach((achievement) => {
                  if (userAchievement.val().id === achievement.val().id) {
                    userAchievements.push(achievement.val());
                    userAchievementList.push({
                      id: userAchievement.val().id,
                      qty: userAchievement.val().qty,
                    });
                  }
                });
              })
              .then(() => {
                setUserAchievement(userAchievements);
                setUserAchievementList(userAchievementList);
              });
          });
          snap.child("friends").forEach((friend) => {
            setFriendsFollowedNumber(
              (friendsFollowedNumber) => friendsFollowedNumber + 1
            );
          });
          setBusy(false);
        }
      });
      leaderboard.on("value", (snap) => {
        setUserLeaderboardData(undefined);
        snap.forEach((entry) => {
          if (entry.key === currentUser.uid) {
            setUserLeaderboardData(entry.val());
          }
        });
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
                    <img
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
                    <h3>{userLeaderboardData?.points}</h3>
                    <p>Poin</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <h3>{userAchievement.length}</h3>
                    <p>Pencapaian</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <h3>{friendsFollowedNumber}</h3>
                    <p>Teman yang diikuti</p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonCard>
                <IonRow class="ion-text-center">
                  <IonCol>
                    <IonText>
                      <p>
                        Panduan Pembelajaran <br /> yang telah diselesaikan
                      </p>
                    </IonText>
                  </IonCol>
                  <IonCol>
                    <h3>{userLeaderboardData?.chaptersDone}</h3>
                    <p>Bab</p>
                  </IonCol>
                  <IonCol>
                    <h3>{userLeaderboardData?.modulesDone}</h3>
                    <p>Modul</p>
                  </IonCol>
                </IonRow>
              </IonCard>
              <IonRow class="ion-text-center">
                <AchievementsWrapper
                  userAchievement={userAchievement}
                  userAchievementList={userAchievementList}
                  requestOpenAchievement={(open) => setOpenAchievement(open)}
                  requestViewAchievement={(achievement) =>
                    setViewAchievement(achievement)
                  }
                />
              </IonRow>
            </IonGrid>
            
            <AchievementModal
              viewAchievement={viewAchievement}
              openAchievement={openAchievement}
              dismiss={(dismiss) => setOpenAchievement(dismiss)}
            />
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
}
