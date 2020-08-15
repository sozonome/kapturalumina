import React, { useContext } from "react";
import { IonModal, IonText, IonButton } from "@ionic/react";

import { Achievement } from "../../models";
import { ThemeContext } from "../providers";

export type AchievementModalType = {
  viewAchievement?: Achievement;
  dismiss: (dismiss: boolean) => void;
  openAchievement: boolean;
};

const AchievementModal = (props: AchievementModalType) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <IonModal
      cssClass={"ion-padding ion-text-center"}
      swipeToClose={true}
      onDidDismiss={() => props.dismiss(false)}
      isOpen={props.openAchievement}
    >
      <IonText color={darkMode ? "light" : "dark"}>
        <h2>{props.viewAchievement?.title}</h2>
      </IonText>
      <img
        style={{ margin: "0 auto", width: "50vw" }}
        src={props.viewAchievement?.img}
        alt=""
      />
      <IonText color={darkMode ? "light" : "dark"}>
        <p>{props.viewAchievement?.subTitle}</p>
      </IonText>
      <IonButton shape="round" onClick={() => props.dismiss(false)}>
        Kembali
      </IonButton>
    </IonModal>
  );
};

export default AchievementModal;
