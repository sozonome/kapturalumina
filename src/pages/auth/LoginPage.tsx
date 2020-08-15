import React, { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonTitle,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLoading,
} from "@ionic/react";
import { Redirect, useHistory } from "react-router";

import { AuthContext } from "../../components/providers";
import { loginUser } from "../../firebase";

import { FocusRafiki } from "../../assets";

const LoginPage = () => {
  const [wait, setWait] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const history = useHistory();

  const login = async () => {
    setWait(true);
    const res = await loginUser(email, password);
    if (res) {
      setEmail("");
      setPassword("");
      history.replace("/");
    }
    setWait(false);
  };

  const enterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      login();
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      {<IonLoading message="Mohon Tunggu..." duration={0} isOpen={wait} />}

      <IonContent className="ion-padding">
        <div className="loginBox">
          <IonGrid>
            <IonRow>
              <IonCol>
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
                <img className="glowFilter" src={FocusRafiki} alt="" />
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6">
                <IonList>
                  <IonItem>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                      onKeyDown={(e) => enterKeyDown(e)}
                      placeholder="E-Mail Anda"
                    />
                  </IonItem>
                  <IonItem>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                      onKeyDown={(e) => enterKeyDown(e)}
                      placeholder="Kata Sandi Anda"
                    />
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6">
                <IonButton
                  expand="block"
                  shape="round"
                  fill="solid"
                  color="success"
                  onClick={login}
                  type="submit"
                >
                  Masuk
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6" className="ion-text-center">
                <IonText>Belum punya akun?</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6">
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
};

export default LoginPage;
