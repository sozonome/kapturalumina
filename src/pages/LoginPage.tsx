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
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../components/providers/AuthProvider";
import { loginUser } from "../firebase/auth";
import { FocusRafiki } from "../assets/assetsref";

function LoginPage(props: any) {
  const [wait, setWait] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    setWait(true);
    const res = await loginUser(email, password);
    if (res) {
      setEmail("");
      setPassword("");
      props.history.replace("/");
    }
    setWait(false);
  }

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
                <img className="glowFilter" src={FocusRafiki} />
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6">
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
            {/* <IonRow className="ion-justify-content-center">
              <IonCol sizeSm="6" className="ion-text-center">
                <IonButton fill="clear">Lupa Kata Sandi</IonButton>
              </IonCol>
            </IonRow> */}
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
}

export default withRouter(LoginPage);
