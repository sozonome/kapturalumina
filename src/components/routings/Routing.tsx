import React, { useContext } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, withRouter, Switch } from "react-router";
import ComponentTestPage from "../../pages/ComponentTestPage";
import MainTabs from "../../pages/main/MainTabs";
import SubModulePage from "../../pages/main/learn/SubModulePage";
import AboutPage from "../../pages/AboutPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import PublicHome from "../../pages/PublicPage";
import ChapterPage from "../../pages/main/learn/ChapterPage";
import { AuthContext } from "../providers/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import QuizPage from "../../pages/main/learn/QuizPage";
import EditProfile from "../../pages/main/profile/EditProfile";
import UserProfile from "../../pages/main/profile/UserProfile";

function Routing() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <IonRouterOutlet id="main">
        <Route component={PublicHome} />
        <PrivateRoute path="/main" component={MainTabs} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute
          exact
          path="/learn/:chapter__id"
          component={ChapterPage}
        />
        <Switch>
          <PrivateRoute
            exact
            path="/learn/:chapterId/:subModuleId"
            component={SubModulePage}
          />
          <PrivateRoute
            exact
            path="/quiz/:chapter_id/:subModule_id"
            component={QuizPage}
          />
        </Switch>

        <PrivateRoute exact path="/editprofile" component={EditProfile} />
        <PrivateRoute exact path="/user/:userId" component={UserProfile} />
        <Route path="/about" component={AboutPage} />
        <Route path="/superadmintest_aiueo" component={ComponentTestPage} />
        <Route path="/home" component={PublicHome} />
        {currentUser ? (
          <Route exact path="/" render={() => <Redirect to="/main" />} />
        ) : (
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        )}
        {/* <Route exact path="/" render={() => <Redirect to="/main" />} /> */}
      </IonRouterOutlet>
    </>
  );
}

export default withRouter(Routing);
