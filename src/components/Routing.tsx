import React, { useContext } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, withRouter } from "react-router";
import ComponentTestPage from "../pages/ComponentTestPage";
import MainTabs from "../pages/MainTabs";
import SubModulePage from "../pages/SubModulePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PublicHome from "../pages/PublicPage";
import ChapterPage from "../pages/ChapterPage";
import { AuthContext } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
// import { PrivateRoute, PublicRoute } from "./RouteType";

function Routing(props: any, isLoggedIn: boolean) {
  const {currentUser} = useContext(AuthContext)
  
  return (
    <IonRouterOutlet id="main">
      <Route component={PublicHome} />
      <PrivateRoute path="/main" component={MainTabs} />
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
      <Route path="/home" component={PublicHome} />
      {
        currentUser ?
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        :<Route exact path="/" render={() => <Redirect to="/home" />} /> 
      }
      {/* <Route exact path="/" render={() => <Redirect to="/main" />} /> */}
      
    </IonRouterOutlet>
  );
}

export default withRouter(Routing);
