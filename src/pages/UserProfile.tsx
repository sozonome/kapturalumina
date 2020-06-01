import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
  IonText,
  IonChip,
  IonIcon,
  IonLabel,
  IonButton,
  IonCardContent,
  IonBadge,
  IonCard,
  IonModal,
  IonLoading,
} from "@ionic/react";
import { UserData } from "../models/users";
import {
  usersData,
  removeFollowedFriend,
  followAsFriend,
} from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";
import { Leaderboard } from "../models/leaderboards";
import { getCurrentUser } from "../firebase/auth";
import Profile from "./Profile";
import { achievements } from "../firebase/achievements";
import { Achievement } from "../models/achievements";

export default function UserProfile(props: any) {
  const [user, setUser] = useState<UserData>();
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [addedAsFriend, setAddedAsFriend] = useState<boolean>(false);
  const currentLoggedInUser = getCurrentUser();
  const user_id = props.match.params.userId;

  const [friendsFollowedNumber, setFriendsFollowedNumber] = useState<number>(0);

  const [openAchievement, setOpenAchievement] = useState<boolean>(false);
  const [viewAchievement, setViewAchievement] = useState<Achievement>();

  const [userAchievement, setUserAchievement] = useState<Achievement[]>([]);
  const [userAchievementList, setUserAchievementList] = useState<any[]>([]);

  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    if (currentLoggedInUser) {
      let userAchievements: Achievement[] = [];
      let userAchievementList: any[] = [];
      usersData.on("value", (snap) => {
        setUser(undefined);
        setLoggedInUser(false);
        setAddedAsFriend(false);
        setBusy(true);
        snap.forEach((entry) => {
          if (entry.val().public_id === user_id) {
            setUser(entry.val());
            if (entry.val().id === currentLoggedInUser.uid) {
              setLoggedInUser(true);
            }
            usersData
              .child(currentLoggedInUser.uid)
              .child("friends")
              .on("value", (snap) => {
                if (snap.exists()) {
                  snap.forEach((friend) => {
                    if (friend.val() === entry.val().id) {
                      setAddedAsFriend(true);
                    }
                  });
                }
              });

            entry.child("achievements").forEach((userAchievement) => {
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
                });
            });
            entry.child("friends").forEach(() => {
              setFriendsFollowedNumber(friendsFollowedNumber + 1);
            });
            setBusy(false);
          }
        });
      });
      leaderboard.on("value", (snap) => {
        setUserLeaderboardData(undefined);
        snap.forEach((entry) => {
          if (entry.val().public_id === user_id) {
            setUserLeaderboardData(entry.val());
          }
        });
      });
    }
  }, [user_id]);

  useEffect(() => {
    // Clean up effect
    return () => {
      // console.log('cleaned up');
      setUser(undefined);
      setUserLeaderboardData(undefined);
      setLoggedInUser(false);
      setAddedAsFriend(false);
      setBusy(true);
      usersData.off();
      leaderboard.off();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {busy ? <IonLoading isOpen={busy} /> : null}
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
          {loggedInUser === false ? (
            <IonRow>
              <IonCol>
                <IonButton
                  color={addedAsFriend ? "tertiary" : "primary"}
                  expand="block"
                  onClick={() => {
                    addedAsFriend
                      ? removeFollowedFriend(user?.id!)
                      : followAsFriend(user?.id!);
                  }}
                >
                  {addedAsFriend ? "Sedang diikuti" : "Ikuti Sebagai Teman"}
                </IonButton>
              </IonCol>
            </IonRow>
          ) : null}
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
            {userAchievement.length > 0 ? (
              <IonCol size="12">
                <IonText>
                  <h4>
                    Pencapaian yang <br /> sudah diraih
                  </h4>
                  <p className="mini">Klik untuk melihat detail pencapaian</p>
                </IonText>
              </IonCol>
            ) : null}
            {userAchievement.map((achievement, index) => {
              let qty;
              userAchievementList.map((list) => {
                if (list.id === achievement.id && list.qty) {
                  qty = list.qty;
                }
              });
              return (
                <IonCol size="6" sizeMd="4" sizeXl="3" key={index}>
                  <IonCard
                    onClick={() => {
                      setOpenAchievement(true);
                      setViewAchievement(achievement);
                    }}
                  >
                    <IonCardContent>
                      <IonImg src={achievement.img} />
                      <IonText>
                        <p>{achievement.title}</p>
                        {qty ? (
                          <IonBadge color="darkcream">{qty}</IonBadge>
                        ) : null}
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonModal
          cssClass={"achievementModal ion-padding ion-text-center"}
          swipeToClose={true}
          onDidDismiss={() => setOpenAchievement(false)}
          isOpen={openAchievement}
        >
          <IonText>
            <h2>{viewAchievement?.title}</h2>
          </IonText>
          <IonImg
            style={{ margin: "0 auto", width: "50vw" }}
            src={viewAchievement?.img}
          />
          <IonText>
            <p>{viewAchievement?.subTitle}</p>
          </IonText>
          <IonButton shape="round" onClick={() => setOpenAchievement(false)}>
            Kembali
          </IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
