import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonLoading,
} from "@ionic/react";
import { useParams } from "react-router";

import { presentToast } from "../../../components/Toast";
import Profilewrapper from "../../../components/ProfileWrapper";

import {
  usersData,
  leaderboard,
  getCurrentUser,
  achievements,
} from "../../../firebase";

import { Leaderboard, UserData, Achievement } from "../../../models";

const UserProfile = () => {
  const [user, setUser] = useState<UserData>();
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [addedAsFriend, setAddedAsFriend] = useState<boolean>(false);
  const currentLoggedInUser = getCurrentUser();
  const { userId }: any = useParams();

  const [friendsFollowedNumber, setFriendsFollowedNumber] = useState<number>(0);

  const [userAchievement, setUserAchievement] = useState<Achievement[]>([]);
  const [userAchievementList, setUserAchievementList] = useState<any[]>([]);

  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    if (currentLoggedInUser) {
      usersData.on("value", (snap) => {
        let userAchievements: Achievement[] = [];
        let userAchievementLists: any[] = [];
        setUser(undefined);
        setLoggedInUser(false);
        setAddedAsFriend(false);
        setBusy(true);
        snap.forEach((entry) => {
          if (entry.val().public_id === userId) {
            setUser(entry.val());
            if (entry.val().id === currentLoggedInUser.uid) {
              setLoggedInUser(true);
            }
            usersData
              .child(currentLoggedInUser.uid)
              .child("friends")
              .on("value", (snapshot) => {
                if (snapshot.exists()) {
                  snapshot.forEach((friend) => {
                    if (friend.val() === entry.val().id) {
                      setAddedAsFriend(true);
                    }
                  });
                }
              });

            entry.child("achievements").forEach((userAchievementData) => {
              achievements
                .once("value", (snapAchievement) => {
                  snapAchievement.forEach((achievement) => {
                    if (userAchievementData.val().id === achievement.val().id) {
                      userAchievements.push(achievement.val());
                      userAchievementLists.push({
                        id: userAchievementData.val().id,
                        qty: userAchievementData.val().qty,
                      });
                    }
                  });
                })
                .then(() => {
                  setUserAchievement(userAchievements);
                  setUserAchievementList(userAchievementLists);
                });
            });
            entry.child("friends").forEach(() => {
              setFriendsFollowedNumber(
                (prevFriendsFollowedNumber) => prevFriendsFollowedNumber + 1
              );
            });
            setBusy(false);
          }
        });
      });
      leaderboard.on("value", (snap) => {
        setUserLeaderboardData(undefined);
        snap.forEach((entry) => {
          if (entry.val().public_id === userId) {
            setUserLeaderboardData(entry.val());
          }
        });
      });
    }
    setTimeout(() => {
      setBusy(false);
      if (userLeaderboardData === null) {
        presentToast("Tidak terhubung dengan jaringan Internet");
      }
    }, 6000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clean up effect
    return () => {
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
        {user && userLeaderboardData ? (
          <Profilewrapper
            profile={{
              loggedInUser,
              addedAsFriend,
            }}
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
    </IonPage>
  );
};

export default UserProfile;
