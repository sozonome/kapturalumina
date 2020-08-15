import React from "react";
import {
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonBadge,
} from "@ionic/react";

import { Achievement } from "../../models";

export type AchievementWrapperProps = {
  userAchievement: Achievement[];
  userAchievementList: any[];
  requestOpenAchievement: (open: boolean) => void;
  requestViewAchievement: (achievement: Achievement) => void;
};

const AchievementsWrapper = (props: AchievementWrapperProps) => {
  return (
    <>
      {props.userAchievement.length > 0 ? (
        <IonCol size="12">
          <IonText>
            <h4>
              Pencapaian yang <br /> sudah diraih
            </h4>
            <p className="mini">Klik untuk melihat detail pencapaian</p>
          </IonText>
        </IonCol>
      ) : null}
      {props.userAchievement.map((achievement, index) => {
        let qty;
        props.userAchievementList.forEach((list) => {
          if (list.id === achievement.id && list.qty) {
            qty = list.qty;
          }
        });
        return (
          <IonCol size="6" sizeMd="4" key={index}>
            <IonCard
              onClick={() => {
                props.requestOpenAchievement(true);
                props.requestViewAchievement(achievement);
              }}
            >
              <IonCardContent>
                <img className="glowFilter" src={achievement.img} alt="" />
                <IonText>
                  <p>{achievement.title}</p>
                  {qty ? <IonBadge color="darkcream">{qty}</IonBadge> : null}
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
        );
      })}
    </>
  );
};

export default AchievementsWrapper;
