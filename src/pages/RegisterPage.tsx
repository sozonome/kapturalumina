import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { presentToast } from "../components/Toast";
import { registerUser } from "../firebaseConfig";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  const confirmationAlert = "Kata Sandi tidak sesuai.";

  async function register() {
    // Validations
    if (password !== cpassword) {
      return presentToast("Kata Sandi tidak sesuai.");
    }
    if (password === "" || email === "") {
      return presentToast("Mohon lengkapi data Anda.", 3000, "warning");
    }
    
    // Post and Get response from Firebase
    const res = await registerUser(email, password);
    if(res){
      presentToast('Pendaftaran berhasil!')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Masuk</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {/* <IonItem className="ion-padding-bottom">
            <IonInput
              onIonChange={(e) => setName(e.detail.value!)}
              type="text"
              placeholder="Nama Anda"
            />
          </IonItem> */}
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
          <IonItem>
            <IonInput
              type="password"
              placeholder="Konfirmasi Kata Sandi Anda"
              onIonChange={(e) => setCPassword(e.detail.value!)}
            />
          </IonItem>
          <IonText className="ion-padding-start" color="danger">
            {password !== ""
              ? cpassword !== ""
                ? cpassword === password
                  ? null
                  : confirmationAlert
                : null
              : null}
          </IonText>
        </IonList>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                shape="round"
                fill="solid"
                color="success"
                onClick={register}
              >
                Daftar
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText>
                Sudah punya akun? <Link to="/login">Login</Link>{" "}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
