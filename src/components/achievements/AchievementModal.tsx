import React from "react";
import { IonModal, IonText, IonButton } from "@ionic/react";
import { Achievement } from "../../models/achievements";

export type AchievementModalType = {
  viewAchievement?: Achievement;
  dismiss: (dismiss: boolean) => void;
  openAchievement: boolean;
};

export default function AchievementModal(props: AchievementModalType) {
  return (
    <IonModal
      cssClass={"achievementModal ion-padding ion-text-center"}
      swipeToClose={true}
      onDidDismiss={() => props.dismiss(false)}
      isOpen={props.openAchievement}
    >
      <IonText>
        <h2>{props.viewAchievement?.title}</h2>
      </IonText>
      <img
        style={{ margin: "0 auto", width: "50vw" }}
        src={props.viewAchievement?.img}
        alt=""
      />
      <IonText>
        <p>{props.viewAchievement?.subTitle}</p>
      </IonText>
      <IonButton shape="round" onClick={() => props.dismiss(false)}>
        Kembali
      </IonButton>
    </IonModal>
  );
}
