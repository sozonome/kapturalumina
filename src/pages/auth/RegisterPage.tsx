import React, { useState, useContext } from "react";
import {
  IonPage,
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
  IonIcon,
} from "@ionic/react";
import { person, mail, key, keyOutline } from "ionicons/icons";
import { Link, Redirect } from "react-router-dom";

import { presentToast } from "../../components/Toast";
import { AuthContext } from "../../components/providers";

import { registerUser } from "../../firebase";

import { FocusBro } from "../../assets";

const RegisterPage = () => {
  const [wait, setWait] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [showPassConfAlert, setShowPassConfAlert] = useState<boolean>(false);

  const confirmationAlert = "Kata Sandi tidak sesuai.";

  const register = async () => {
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
      const res = await registerUser(name, email, password);
      setWait(false);
      if (res) {
        presentToast("Pendaftaran berhasil!");
      }
    }
  };

  const enterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      register();
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      {
        <IonLoading
          message="Pendaftaran sedang di proses..."
          isOpen={wait}
          duration={0}
        />
      }
      <IonContent className="ion-padding">
        <div className="registerBox">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonTitle>
                  <span role="img" aria-label="camera">
                    📷
                  </span>
                  KapturaLumina
                </IonTitle>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{ margin: "0 auto", maxWidth: "300px" }}>
                <img className="glowFilter" src={FocusBro} alt="" />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonList>
            <IonItem>
              <IonIcon icon={person} />
              <IonInput
                type="text"
                onIonChange={(e) => setName(e.detail.value!)}
                onKeyDown={(e) => enterKeyDown(e)}
                placeholder="Nama Anda"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} />
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.detail.value!)}
                onKeyDown={(e) => enterKeyDown(e)}
                placeholder="E-Mail Anda"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={key} />
              <IonInput
                type="password"
                onIonChange={(e) => setPassword(e.detail.value!)}
                onKeyDown={(e) => enterKeyDown(e)}
                placeholder="Kata Sandi Anda"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={keyOutline} />
              <IonInput
                type="password"
                onIonChange={(e) => setCPassword(e.detail.value!)}
                onKeyDown={(e) => enterKeyDown(e)}
                placeholder="Konfirmasi Kata Sandi Anda"
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
                  style={{ margin: "0 auto", maxWidth: "320px" }}
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
