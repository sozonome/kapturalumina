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

// function PublicRoute(props: any) {
//   if (props.isLoggedIn === false) {
//     return <Route {...props} />;
//   }
//   return <Route exact path={props.path} render={() => <Redirect to="/main" />} />;
// }

// function PrivateRoute(props: any) {
//   if (props.isLoggedIn === true) {
//     return <Route {...props} />;
//   }
//   return <Route exact path={props.path} render={() => <Redirect to="/login" />} />;
// }

function Routing(props: any) {
  return (
    <IonRouterOutlet id="main">
      <Route component={MainTabs} />
      <Route path="/main" component={MainTabs} />
      <Route component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
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