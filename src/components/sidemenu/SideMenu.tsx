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
  IonToggle,
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
  moon,
} from "ionicons/icons";
import { withRouter, useHistory } from "react-router";

import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import { logoutUser } from "../../firebase/auth";

import { FocusRafiki } from "../../assets";

function SideMenu() {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const { darkMode, changeMode } = useContext(ThemeContext);

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
                    history.push("/login");
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

          <IonItem>
            <IonIcon slot="start" icon={moon} />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} slot="end" onIonChange={changeMode} />
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <img
              src={FocusRafiki}
              width="100%"
              className="glowFilter"
              alt="A person holding a camera."
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default withRouter(SideMenu);
