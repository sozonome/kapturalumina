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

import { getCurrentUser, usersData, leaderboard, achievements  } from "../../../firebase";

import { UserData,Achievement,Leaderboard  } from "../../../models";

export default function Profile() {
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
          snap.child("friends").forEach(() => {
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
}
