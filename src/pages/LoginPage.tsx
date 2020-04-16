import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLoading,
} from "@ionic/react";
import { loginUser } from "../firebaseConfig";
import { presentToast } from "../components/Toast";
import { Redirect, useHistory } from "react-router";

export default function LoginPage(props: any) {
  const [wait, setWait] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    setWait(true);
    const res = await loginUser(email, password);
    if (res) {
      presentToast("Berhasil Masuk!");
    } else {
      setEmail("");
      setPassword("");
    }
    setWait(false);
  }

  return (
    <IonPage>
      {<IonLoading message="Mohon Tunggu..." duration={0} isOpen={wait} />}
      <IonContent>
        <IonHeader>
          <IonToolbar style={{ height: "20vh" }} color="tertiary">
            <IonTitle size="large">Masuk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonList>
            <IonItem>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                placeholder="E-Mail Anda"
              />
            </IonItem>
            <IonItem>
              <IonInput
                value={password}
                type="password"
                placeholder="Kata Sandi Anda"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  shape="round"
                  fill="solid"
                  color="success"
                  onClick={login}
                >
                  Masuk
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton fill="clear">Lupa Kata Sandi</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonText>Belum punya akun?</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  shape="round"
                  fill="solid"
                  color="secondary"
                  routerLink="/register"
                >
                  Daftar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}
