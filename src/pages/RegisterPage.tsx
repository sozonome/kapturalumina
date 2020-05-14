import React, { useState, useContext } from "react";
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
  IonLoading,
} from "@ionic/react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { presentToast } from "../components/Toast";
import { registerUser } from "../firebaseConfig";
import { AuthContext } from "../components/AuthProvider";

function RegisterPage() {
  const [wait, setWait] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [showPassConfAlert, setShowPassConfAlert] = useState<boolean>(false);

  const confirmationAlert = "Kata Sandi tidak sesuai.";

  async function register() {
    // Validations
    setWait(true);
    if (password !== cpassword) {
      setWait(false);
      return setShowPassConfAlert(true);
    } else if (password === "" || email === "" || name === "") {
      setWait(false);
      return presentToast("Mohon lengkapi data Anda.", 3000, "warning");
    } else {
      // setWait(false);
      setShowPassConfAlert(false); 
      // Post and Get response from Firebase
      const res = await registerUser(name, email, password)
      setWait(false);
      if (res) {
        presentToast("Pendaftaran berhasil!");
      }
    }
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daftar</IonTitle>
        </IonToolbar>
      </IonHeader>
      {
        <IonLoading
          message="Pendaftaran sedang di proses..."
          isOpen={wait}
          duration={0}
        />
      }
      <IonContent className="ion-padding">
        <IonList>
          <IonItem className="ion-padding-bottom">
            <IonInput
              onIonChange={(e) => setName(e.detail.value!)}
              type="text"
              placeholder="Nama Anda"
            />
          </IonItem>
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
            {showPassConfAlert ? confirmationAlert : null}
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
                Sudah punya akun? <Link to="/login">Login</Link>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(RegisterPage);
