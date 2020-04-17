import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, withRouter } from "react-router";
import ComponentTestPage from "../pages/ComponentTestPage";
import MainTabs from "../pages/MainTabs";
import { ChapterPage } from "../routes";
import SubModulePage from "../pages/SubModulePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import { PrivateRoute, PublicRoute } from "./RouteType";

function Routing(props: any) {
  return (
    <IonRouterOutlet id="main">
      <Route component={MainTabs} />
      <Route path="/main" component={MainTabs} />
      <Route restricted={true} component={LoginPage} />
      <Route restricted={true} path="/login" component={LoginPage} />
      <Route restricted={true} path="/register" component={RegisterPage} />
      <Route exact path="/learn/:chapterId" component={ChapterPage} />
      <Route
        exact
        path="/learn/:chapterId/:subModuleId"
        component={SubModulePage}
      />

      <Route path="/about" component={AboutPage} />
      <Route path="/test" component={ComponentTestPage} />
      <Route exact path="/" render={() => <Redirect to="/main" />} />
    </IonRouterOutlet>
  );
}

export default withRouter(Routing);