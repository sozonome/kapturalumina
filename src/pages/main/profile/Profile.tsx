import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonLoading,
} from "@ionic/react";

import Profilewrapper from "../../../components/ProfileWrapper";

import {
  getCurrentUser,
  usersData,
  leaderboard,
  achievements,
} from "../../../firebase";

import { UserData, Achievement, Leaderboard } from "../../../models";

const Profile = () => {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);

  const [friendsFollowedNumber, setFriendsFollowedNumber] = useState<number>(0);

  const [userAchievement, setUserAchievement] = useState<Achievement[]>([]);
  const [userAchievementList, setUserAchievementList] = useState<any[]>([]);
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      usersData.child(currentUser.uid).on("value", (snap) => {
        let tempUserAchievement: Achievement[] = [];
        let tempUserAchievementList: any[] = [];
        setBusy(true);
        if (snap.exists()) {
          setUser(snap.val());
          snap.child("achievements").forEach((userAchievementData) => {
            achievements
              .once("value", (snapAchievement) => {
                snapAchievement.forEach((achievement) => {
                  if (userAchievementData.val().id === achievement.val().id) {
                    tempUserAchievement.push(achievement.val());
                    tempUserAchievementList.push({
                      id: userAchievementData.val().id,
                      qty: userAchievementData.val().qty,
                    });
                  }
                });
              })
              .then(() => {
                setUserAchievement(tempUserAchievement);
                setUserAchievementList(tempUserAchievementList);
              });
          });
          snap.child("friends").forEach(() => {
            setFriendsFollowedNumber(
              (prevFriendsFollowedNumber) => prevFriendsFollowedNumber + 1
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
            {user && userLeaderboardData ? (
              <Profilewrapper
                mainMenu
                value={{
                  user,
                  userLeaderboardData,
                  userAchievement,
                  userAchievementList,
                  friendsFollowedNumber,
                }}
              />
            ) : null}
          </IonContent>
        </>
      ) : null}
    </IonPage>
  );
};

export default Profile;
