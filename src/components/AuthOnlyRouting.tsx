import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AuthOnlyRouting() {
  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </IonRouterOutlet>
  );
}
