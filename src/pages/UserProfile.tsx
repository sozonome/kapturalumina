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
} from "@ionic/react";
import { UserData } from "../models/users";
import { usersData, removeFollowedFriend, followAsFriend } from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";
import { Leaderboard } from "../models/leaderboards";
import { getCurrentUser } from "../firebase/auth";
import Profile from "./Profile";

export default function UserProfile(props: any) {
  const [user, setUser] = useState<UserData>();
  const [userLeaderboardData, setPoints] = useState<Leaderboard>();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [addedAsFriend, setAddedAsFriend] = useState<boolean>(false);
  const currentLoggedInUser = getCurrentUser();
  const user_id = props.match.params.userId;

  const [achievementNumber, setAchievementNumber] = useState<number>(0);
  const [friendsFollowedNumber, setFriendsFollowedNumber] = useState<number>(0);


  useEffect(() => {
    if(currentLoggedInUser){
      usersData.on("value", (snap) => {
        setUser(undefined);
        setLoggedInUser(false);
        setAddedAsFriend(false);
        snap.forEach((entry) => {
          if (entry.val().public_id === user_id) {
            setUser(entry.val());
            if(entry.val().id === currentLoggedInUser.uid){
              setLoggedInUser(true);
            }
            usersData.child(currentLoggedInUser.uid).child("friends").on("value", (snap)=>{
              if(snap.exists()){
                snap.forEach((friend)=>{
                  if(friend.val()===entry.val().id){
                    setAddedAsFriend(true);
                  }
                })
              }
            })
            entry.child("achievements").forEach(() => {
              setAchievementNumber(achievementNumber + 1);
            });
            entry.child("friends").forEach(() => {
              setFriendsFollowedNumber(friendsFollowedNumber + 1);
            });
          }
        });
      });
      leaderboard.on("value", (snap) => {
        setPoints(undefined)
        snap.forEach((entry) => {
          if (entry.val().public_id === user_id) {
            setPoints(entry.val());
          }
        });
      });
    }
  }, []);

  useEffect(()=>{
    // Clean up effect
    return () => {
      console.log('cleaned up');
      setUser(undefined)
      setPoints(undefined)
      setLoggedInUser(false)
      setAddedAsFriend(false)
      usersData.off()
      leaderboard.off()
    }
  }, [])

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
                  onClick={()=>{
                    addedAsFriend ? removeFollowedFriend(user?.id!) : followAsFriend(user?.id!)
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
                <h3>{achievementNumber}</h3>
                <p>Pencapaian</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonText>
                <p>Panduan Pembelajaran yang telah diselesaikan</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>
              <h3>{userLeaderboardData?.chaptersDone}</h3>
              <p>Bab</p>
            </IonCol>
            <IonCol>
              <h3>{userLeaderboardData?.modulesDone}</h3>
              <p>Modul</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
