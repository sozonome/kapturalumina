import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonAvatar,
  IonCol,
  IonText,
  IonButton,
  IonLabel,
  IonChip,
  IonIcon,
  IonCard,
} from "@ionic/react";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";

import AchievementsWrapper from "./achievements/AchievementsWrapper";
import AchievementModal from "./achievements/AchievementModal";

import { removeFollowedFriend, followAsFriend } from "../firebase";

import { UserData, Leaderboard, Achievement } from "../models";

type ProfileWrapperProps = {
  mainMenu?: boolean;
  profile?: {
    loggedInUser: boolean;
    addedAsFriend: boolean;
  };
  value: {
    user: UserData;
    userLeaderboardData: Leaderboard;
    userAchievement: Achievement[];
    userAchievementList: any[];
    friendsFollowedNumber: number;
  };
};

const Profilewrapper = ({ mainMenu, profile, value }: ProfileWrapperProps) => {
  const [openAchievement, setOpenAchievement] = useState<boolean>(false);
  const [viewAchievement, setViewAchievement] = useState<Achievement>();

  const {
    user,
    userLeaderboardData,
    userAchievement,
    userAchievementList,
    friendsFollowedNumber,
  } = value;

  return (
    <>
      <IonGrid>
        <IonRow class="ion-padding-vertical">
          <IonCol size="3" style={{ position: "relative" }}>
            <IonAvatar
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={"https://api.adorable.io/avatars/200/" + user.name}
                alt="avatar"
              />
            </IonAvatar>
          </IonCol>
          <IonCol size="9">
            <IonText>
              <h4>{user.name}</h4>
              <p>{user.bio} </p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="socialMediaLinks">
          {user.socialLinks?.instagram && (
            <a
              href={"http://www.instagram.com/" + user.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonChip color="insta">
                <IonIcon icon={logoInstagram} />
                <IonLabel>Instagram</IonLabel>
              </IonChip>
            </a>
          )}

          {user.socialLinks?.youtube && (
            <a
              href={"https://youtube.com/" + user.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonChip color="youtube">
                <IonIcon icon={logoYoutube} />
                <IonLabel>YouTube</IonLabel>
              </IonChip>
            </a>
          )}

          {user.socialLinks?.website && (
            <a
              href={user.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonChip color="darkcream">
                <IonIcon icon={globeOutline} />
                <IonLabel>Website</IonLabel>
              </IonChip>
            </a>
          )}
        </IonRow>
        {mainMenu ? (
          <IonRow>
            <IonCol size="12">
              <IonButton
                expand="block"
                size="small"
                shape="round"
                routerLink="/editprofile"
              >
                Edit Profil
              </IonButton>
            </IonCol>
          </IonRow>
        ) : profile?.loggedInUser === false ? (
          <IonRow>
            <IonCol>
              <IonButton
                color={profile.addedAsFriend ? "tertiary" : "primary"}
                expand="block"
                onClick={() => {
                  profile.addedAsFriend
                    ? removeFollowedFriend(user.id)
                    : followAsFriend(user.id);
                }}
              >
                {profile.addedAsFriend
                  ? "Sedang diikuti"
                  : "Ikuti Sebagai Teman"}
              </IonButton>
            </IonCol>
          </IonRow>
        ) : null}
        <IonRow class="ion-text-center">
          <IonCol>
            <IonText>
              <h3>{userLeaderboardData.points}</h3>
              <p>Poin</p>
            </IonText>
          </IonCol>
          <IonCol>
            <IonText>
              <h3>{userAchievement.length}</h3>
              <p>Pencapaian</p>
            </IonText>
          </IonCol>
          <IonCol>
            <IonText>
              <h3>{friendsFollowedNumber}</h3>
              <p>Teman yang diikuti</p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonCard>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonText>
                <p>
                  Panduan Pembelajaran <br /> yang telah diselesaikan
                </p>
              </IonText>
            </IonCol>
            <IonCol>
              <h3>{userLeaderboardData.chaptersDone}</h3>
              <p>Bab</p>
            </IonCol>
            <IonCol>
              <h3>{userLeaderboardData.modulesDone}</h3>
              <p>Modul</p>
            </IonCol>
          </IonRow>
        </IonCard>
        <IonRow class="ion-text-center">
          <AchievementsWrapper
            userAchievement={userAchievement}
            userAchievementList={userAchievementList}
            requestOpenAchievement={(open) => setOpenAchievement(open)}
            requestViewAchievement={(achievement) =>
              setViewAchievement(achievement)
            }
          />
        </IonRow>
      </IonGrid>

      <AchievementModal
        viewAchievement={viewAchievement}
        openAchievement={openAchievement}
        dismiss={(dismiss) => setOpenAchievement(dismiss)}
      />
    </>
  );
};

export default Profilewrapper;
