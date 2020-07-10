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
import { UserData } from "../models/users";
import { usersData } from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";
import { Leaderboard } from "../models/leaderboards";
import { getCurrentUser } from "../firebase/auth";
import { achievements } from "../firebase/achievements";
import { Achievement } from "../models/achievements";
import { presentToast } from "../components/Toast";
import Profilewrapper from "../components/ProfileWrapper";
import { useParams } from "react-router";

export default function UserProfile(props: any) {
  const [user, setUser] = useState<UserData>();
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [addedAsFriend, setAddedAsFriend] = useState<boolean>(false);
  const currentLoggedInUser = getCurrentUser();
  const { userId } = useParams();

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
                      userAchievementLists.push({
                        id: userAchievement.val().id,
                        qty: userAchievement.val().qty,
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
                (friendsFollowedNumber) => friendsFollowedNumber + 1
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
  }, [userId]);

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
}
