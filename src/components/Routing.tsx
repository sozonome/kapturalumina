import React, { useContext } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, withRouter, Switch } from "react-router";
import ComponentTestPage from "../pages/ComponentTestPage";
import MainTabs from "../pages/MainTabs";
import SubModulePage from "../pages/SubModulePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PublicHome from "../pages/PublicPage";
import ChapterPage from "../pages/ChapterPage";
import { AuthContext } from "./providers/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import QuizPage from "../pages/QuizPage";
import EditProfile from "../pages/EditProfile";
import UserProfile from "../pages/UserProfile";

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
        {/* <PrivateRoute 
          path="/learn"
          component={LearnWrapper}
        /> */}

        <PrivateRoute exact path="/editprofile" component={EditProfile} />
        <PrivateRoute exact path="/user/:userId" component={UserProfile} />
        <Route path="/about" component={AboutPage} />
        <Route path="/superadmintest" component={ComponentTestPage} />
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
