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
} from "@ionic/react";
import "./SideMenu.css";
import {
  homeSharp,
  listSharp,
  personSharp,
  logOutSharp,
  informationCircleSharp,
  openSharp,
  logInSharp,
  personAddSharp,
} from "ionicons/icons";
import { logoutUser } from "../firebaseConfig";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import { presentToast } from "./Toast";

function SideMenu(props: any) {
  const { currentUser } = useContext(AuthContext);

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent>
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
              <IonLabel>Tentang KapturaLumina</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonItem>
            <p
              style={{
                letterSpacing: "0.1em",
                fontWeight: 450,
                fontSize: "0.8em",
              }}
            >
              Jika Anda telah mencoba menggunakan aplikasi ini, silakan mengisi
              form di bawah ini. Terima Kasih
            </p>
          </IonItem>
          <IonItem onClick={() => window.open("https://google.com")}>
            <IonIcon slot="start" icon={openSharp} />
            <IonLabel>Isi Form</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default withRouter(SideMenu);
