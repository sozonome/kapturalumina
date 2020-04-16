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
} from "@ionic/react";
import { loginUser } from "../firebaseConfig";
import { presentToast } from "../components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function login() {
    const res = await loginUser(email, password);
    if(res){
      presentToast('Berhasil Masuk!')
    }
  }

  return (
    <IonPage>
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
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                placeholder="E-Mail Anda"
              />
            </IonItem>
            <IonItem>
              <IonInput
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
              <IonCol size="3" />
              <IonCol size="6">
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
