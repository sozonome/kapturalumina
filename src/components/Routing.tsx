import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
// import { MainTabs, ChapterPage, SubModulePage, AboutPage } from "../routes";
import ComponentTestPage from "../pages/ComponentTestPage";
import MainTabs from "../pages/MainTabs";
import { ChapterPage } from "../routes";
import SubModulePage from "../pages/SubModulePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function Routing() {
  return (
    <IonRouterOutlet id="main">
      <Route path="/main" component={MainTabs} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/learn/:chapterId" component={ChapterPage} />
      <Route
        exact
        path="/learn/:chapterId/:subModuleId"
        component={SubModulePage}
      />

      <Route path="/about" component={AboutPage} />
      <Route path="/test" component={ComponentTestPage} />
      {/* <Route path="/home" component={Home} exact={true} /> */}
      <Route exact path="/" render={() => <Redirect to="/main" />} />
    </IonRouterOutlet>
  );
}
