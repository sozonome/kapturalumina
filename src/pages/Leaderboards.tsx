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

function Leaderboards() {
  useEffect(() => {}, []);
  const [filterUser, setFilterUser] = useState<"global" | "antar-teman">(
    "global"
  );
  const [filterTime, setFilterTime] = useState<"daily" | "all-time">("daily");

  const [busy, setBusy] = useState<boolean>(false);

  useEffect(()=>{
    setBusy(true);

    setBusy(false);
  }, [filterUser, filterTime])

  const leaederboardData: Leaderboard[] = [
    {
      name: "Willy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 300,
      level: 2,
    },
    {
      name: "Wonky",
      modulesDone: 12,
      chaptersDone: 2,
      points: 200,
      level: 2,
    },
    {
      name: "Wonka",
      modulesDone: 12,
      chaptersDone: 2,
      points: 100,
      level: 2,
    },
    {
      name: "Wendy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 500,
      level: 2,
    },
    {
      name: "Willy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 300,
      level: 2,
    },
    {
      name: "Wonky",
      modulesDone: 12,
      chaptersDone: 2,
      points: 200,
      level: 2,
    },
    {
      name: "Wonka",
      modulesDone: 12,
      chaptersDone: 2,
      points: 100,
      level: 2,
    },
    {
      name: "Wendy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 500,
      level: 2,
    },
    {
      name: "Willy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 300,
      level: 2,
    },
    {
      name: "Wonky",
      modulesDone: 12,
      chaptersDone: 2,
      points: 200,
      level: 2,
    },
    {
      name: "Wonka",
      modulesDone: 12,
      chaptersDone: 2,
      points: 100,
      level: 2,
    },
    {
      name: "Wendy",
      modulesDone: 12,
      chaptersDone: 2,
      points: 500,
      level: 2,
    },
  ];
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
            onIonChange={(e) => console.log("Segment Selected", e.detail.value)}
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
            onIonChange={(e) => console.log("Segment Selected", e.detail.value)}
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
            {leaederboardData.map((user, index) => {
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
