import React, { useContext } from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonIcon,
  IonImg,
} from "@ionic/react";
import "./SideMenu.css";
import {
  homeSharp,
  listSharp,
  personSharp,
  logOutSharp,
  informationCircleSharp,
  logInSharp,
  personAddSharp,
} from "ionicons/icons";
import { withRouter } from "react-router";
import { AuthContext } from "./providers/AuthProvider";
import { logoutUser } from "../firebase/auth";
import { FocusRafiki } from "../assets/assetsref";

function SideMenu(props: any) {
  const { currentUser } = useContext(AuthContext);

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent class="sideMenu">
        <IonList lines="none">
          <IonListHeader>
            <span role="img" aria-label="camera">
              📷
            </span>
            KapturaLumina
          </IonListHeader>
          {currentUser ? (
            <>
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/main">
                  <IonIcon slot="start" icon={homeSharp} />
                  <IonLabel>Home</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/main/leaderboards">
                  <IonIcon slot="start" icon={listSharp} />
                  <IonLabel>Papan Peringkat</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/main/profile">
                  <IonIcon slot="start" icon={personSharp} />
                  <IonLabel>Profil</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          ) : (
            <IonMenuToggle auto-hide="false">
              <IonItem routerLink="/home">
                <IonIcon slot="start" icon={homeSharp} />
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Akun</IonListHeader>
          {currentUser ? (
            <IonMenuToggle auto-hide="false">
              <IonItem
                onClick={() =>
                  logoutUser().then(() => {
                    props.history.push("/login");
                  })
                }
              >
                <IonIcon slot="start" icon={logOutSharp} />
                <IonLabel>Keluar</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : (
            <>
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/login">
                  <IonIcon slot="start" icon={logInSharp} />
                  <IonLabel>Masuk</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/register">
                  <IonIcon slot="start" icon={personAddSharp} />
                  <IonLabel>Daftar</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          )}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Hello</IonListHeader>
          <IonMenuToggle auto-hide="false">
            <IonItem routerLink="/about">
              <IonIcon slot="start" icon={informationCircleSharp} />
              <IonLabel>Tentang</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList>
          <IonItem>
            <img
              src={
                FocusRafiki
              }
              width="100%"
              className="glowFilter"
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default withRouter(SideMenu);
