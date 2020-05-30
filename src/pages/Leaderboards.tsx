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
  IonCard,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonLoading,
} from "@ionic/react";
import { Leaderboard } from "../models/leaderboards";
import { personCircle } from "ionicons/icons";
import { leaderboard } from "../firebase/leaderboard";
import getCurrentDate from "../functions/getCurrentDate";
import { usersData, getUserData } from "../firebase/users";
import { User } from "firebase";
import { getCurrentUser } from "../firebase/auth";

function Leaderboards() {
  useEffect(() => {}, []);
  const [filterUser, setFilterUser] = useState<"global" | "friends">(
    "global"
  );
  const [filterTime, setFilterTime] = useState<"daily" | "all-time">("daily");

  const [busy, setBusy] = useState<boolean>(false);

  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[]>([]);

  useEffect(() => {
    setBusy(true);
    console.log(filterUser, filterTime)
    
    if(filterUser==="global"){
      if(filterTime==="all-time"){
        leaderboard.orderByChild('points').on("value", (snap)=>{
          setLeaderboardData([]);
          const leaderBoardData:Leaderboard[] = [];
          snap.forEach((entry)=>{
            leaderBoardData.push(entry.val())
          })
          setLeaderboardData(leaderBoardData.reverse())
        })
      }else{
        leaderboard.on("value", (snap)=>{
          setLeaderboardData([]);
          const leaderBoardData:Leaderboard[] = [];
          snap.forEach((entry)=>{
            const todayPoints = entry.val().dailyPoints.pop();
            if(todayPoints.date === getCurrentDate()){
              console.log(todayPoints)
              leaderBoardData.push({
                name: entry.val().name,
                points: todayPoints.points
              })
            }
          })
          leaderBoardData.sort((a, b)=> b.points - a.points)
          setLeaderboardData(leaderBoardData);
        })
      }
    } else {
      const user = getCurrentUser()
      if(filterTime==="all-time"){
        leaderboard.orderByChild('points').on("value", (snap)=>{
          setLeaderboardData([]);
          const leaderBoardData:Leaderboard[] = [];
          snap.forEach((entry)=>{
            if(user){
              if(entry.key===user.uid){
                leaderBoardData.push(entry.val())
              }
              usersData.child(user.uid).child("friends").once("value", (userSnap)=>{
                if(userSnap.exists()){
                  userSnap.forEach((friend)=>{
                    if(friend.val() === entry.key){
                      leaderBoardData.push(entry.val());
                    }
                  })
                }
              })
            }
          })
          setLeaderboardData(leaderBoardData.reverse())
        })
      } else {
        leaderboard.on("value", (snap)=>{
          setLeaderboardData([]);
          const leaderBoardData:Leaderboard[] = [];
          snap.forEach((entry)=>{
            const todayPoints = entry.val().dailyPoints.pop();
            if(todayPoints.date === getCurrentDate()){
              console.log(todayPoints)
              if(user){
                if(entry.key===user.uid){
                  leaderBoardData.push({
                    name: entry.val().name,
                    points: todayPoints.points
                  })
                }
                usersData.child(user.uid).child("friends").on("value", (userSnap)=>{
                  if(userSnap.exists()){
                    userSnap.forEach((friend)=>{
                      if(friend.val() === entry.key){
                        leaderBoardData.push({
                          name: entry.val().name,
                          points: todayPoints.points
                        });
                      }
                    })
                  }
                })
              }
            }
          })
          setLeaderboardData(leaderBoardData.sort((a,b)=> b.points - a.points));
        })
      }
    }
    setBusy(false);
  }, [filterUser, filterTime]);

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
            onIonChange={(e:any) =>  setFilterUser(e.detail.value)}
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
            onIonChange={(e:any) => setFilterTime(e.detail.value)}
            color="secondary"
            value={filterTime}
          >
            <IonSegmentButton value="daily">
              <IonLabel>Harian</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all-time">
              <IonLabel>Sepanjang-Waktu</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Papan Peringkat</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid style={{ padding: 0 }}>
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
                <IonItemSliding key={index}>
                  <IonItemOptions side="start">
                    <IonItemOption expandable>
                      <IonIcon icon={personCircle} size="large" />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem>
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
                          <IonImg src="https://api.adorable.io/avatars/285/admin2@adorable.io" />
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
                  <IonItemOptions side="end">
                    <IonItemOption>Lihat Profil</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Leaderboards;
