import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonText,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonCol,
  IonLoading,
} from "@ionic/react";

import { leaderboard, usersData, getCurrentUser } from "../../firebase";
import { getCurrentDate } from "../../functions";

import { Leaderboard } from "../../models";

import { WinnersPana } from "../../assets";

const Leaderboards = () => {
  const [filterUser, setFilterUser] = useState<"global" | "friends">("global");
  const [filterTime, setFilterTime] = useState<"daily" | "all-time">(
    "all-time"
  );

  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[]>([]);

  useEffect(() => {
    setBusy(true);

    if (filterUser === "global") {
      if (filterTime === "all-time") {
        const leaderBoardData: Leaderboard[] = [];
        leaderboard.orderByChild("points").on("value", (snap) => {
          setNeedUpdate(true);
          setLeaderboardData([]);
          snap.forEach((entry) => {
            leaderBoardData.push(entry.val());
          });
          leaderBoardData.reverse();
          setLeaderboardData(leaderBoardData);
        });
        setNeedUpdate(false);
      } else {
        const leaderBoardData: Leaderboard[] = [];
        leaderboard.on("value", (snap) => {
          setNeedUpdate(true);
          setLeaderboardData([]);
          snap.forEach((entry) => {
            const todayPoints = entry.val().dailyPoints.pop();
            if (todayPoints.date === getCurrentDate()) {
              leaderBoardData.push({
                name: entry.val().name,
                points: todayPoints.points,
                public_id: entry.val().public_id,
              });
            }
          });
          leaderBoardData.sort((a, b) => b.points - a.points);
          setLeaderboardData(leaderBoardData);
        });
        setNeedUpdate(false);
      }
    } else {
      // Followed Friend
      const user = getCurrentUser();
      if (filterTime === "all-time") {
        let leaderBoardData: Leaderboard[] = [];
        setLeaderboardData([]);
        leaderboard.orderByChild("points").on("value", (snap) => {
          snap.forEach((entry) => {
            if (user) {
              if (entry.key === user.uid) {
                leaderBoardData.push(entry.val());
              }
              usersData
                .child(user.uid)
                .child("friends")
                .on("value", (userSnap) => {
                  setNeedUpdate(true);
                  // leaderBoardData = [];
                  if (userSnap.exists()) {
                    userSnap.forEach((friend) => {
                      if (friend.val() === entry.key) {
                        leaderBoardData.push(entry.val());
                      }
                    });
                  }
                });
            }
          });
          leaderBoardData.reverse();
          setLeaderboardData(leaderBoardData);
          setNeedUpdate(false);
        });
      } else {
        leaderboard.on("value", (snap) => {
          let leaderBoardData: Leaderboard[] = [];
          setLeaderboardData([]);
          snap.forEach((entry) => {
            const todayPoints = entry.val().dailyPoints.pop();
            if (todayPoints.date === getCurrentDate()) {
              if (user) {
                if (entry.key === user.uid) {
                  leaderBoardData.push({
                    name: entry.val().name,
                    points: todayPoints.points,
                    public_id: entry.val().public_id,
                  });
                }
                usersData
                  .child(user.uid)
                  .child("friends")
                  .on("value", (userSnap) => {
                    setNeedUpdate(true);
                    // leaderBoardData = [];
                    if (userSnap.exists()) {
                      userSnap.forEach((friend) => {
                        if (friend.val() === entry.key) {
                          leaderBoardData.push({
                            name: entry.val().name,
                            points: todayPoints.points,
                            public_id: entry.val().public_id,
                          });
                        }
                      });
                    }
                  });
              }
            }
          });
          leaderBoardData.sort((a, b) => b.points - a.points);
          setLeaderboardData(leaderBoardData);
          setNeedUpdate(false);
        });
      }
    }
    setBusy(false);
  }, [filterUser, filterTime, needUpdate]);

  return (
    <IonPage>
      {<IonLoading message={"Mohon tunggu..."} isOpen={busy} />}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Papan Peringkat</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            onIonChange={(e: any) => setFilterUser(e.detail.value)}
            color="primary"
            value={filterUser}
          >
            <IonSegmentButton value="global">
              <IonLabel>Global</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="friends">
              <IonLabel>Antar-Teman</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            onIonChange={(e: any) => setFilterTime(e.detail.value)}
            color="darkcream"
            value={filterTime}
          >
            <IonSegmentButton value="all-time">
              <IonLabel>Sepanjang-Waktu</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="daily">
              <IonLabel>Harian</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent class="leaderboardPage">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Papan Peringkat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid style={{ padding: 0 }}>
          <IonRow>
            <IonCol style={{ margin: "0 auto", maxWidth: "250px" }}>
              <img className="glowFilter" src={WinnersPana} alt="" />
            </IonCol>
          </IonRow>
          {filterTime === "daily" ? (
            <IonRow class="ion-text-center">
              <IonCol>
                <IonText>
                  <h4>{getCurrentDate()}</h4>
                </IonText>
              </IonCol>
            </IonRow>
          ) : null}
          <IonRow></IonRow>
          <IonCol size="12">
            <IonText class="ion-text-center">
              <p>Klik user untuk melihat Profil</p>
            </IonText>
          </IonCol>
          <IonRow>
            <IonCol size="5" push="4">
              <IonText>
                <p>Nama</p>
              </IonText>
            </IonCol>
            <IonCol size="3" push="4">
              <IonText>
                <p>Poin</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonList lines="none">
            {leaderboardData?.map((user, index) => {
              return (
                <IonItem routerLink={`/user/${user.public_id}`} key={index}>
                  <IonRow
                    style={{ width: "100%" }}
                    class="ion-align-items-center leaderboardEntry"
                  >
                    <IonCol size="1">
                      <IonText>
                        <p>{index + 1}</p>
                      </IonText>
                    </IonCol>
                    <IonCol size="3" class="ion-justify-content-center">
                      <IonAvatar
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <IonImg
                          src={
                            "https://api.adorable.io/avatars/200/" + user.name
                          }
                        />
                      </IonAvatar>
                    </IonCol>
                    <IonCol size="5">
                      <IonText>
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                          {user.name}
                        </p>
                      </IonText>
                    </IonCol>
                    <IonCol size="3">
                      <IonText>
                        <h2>{user.points}</h2>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonItem>
              );
            })}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboards;
