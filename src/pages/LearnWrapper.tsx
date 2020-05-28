import React, { Suspense } from "react";
import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Switch, Route, withRouter, Router } from "react-router";
import PrivateRoute from "../components/PrivateRoute";
import ChapterPage from "./ChapterPage";
import SubModulePage from "./SubModulePage";
import { IonReactRouter } from "@ionic/react-router";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Loader from "../components/Loader";

const history = createBrowserHistory();

function LearnWrapper() {
  return (
    <Switch>
      <PrivateRoute exact path="/learn/:chapter__id" component={ChapterPage} />
      <PrivateRoute
        exact
        path="/learn/:chapterId/:subModuleId"
        component={SubModulePage}
      />
    </Switch>
    // <Switch>
    //   <PrivateRoute
    //     exact
    //     path="/learn/:chapter__id"
    //     component={ChapterPage}
    //   />
    //   <PrivateRoute
    //     exact
    //     path="/learn/:chapterId/:subModuleId"
    //     component={SubModulePage}
    //   />
    // </Switch>
  );
}
export default withRouter(LearnWrapper);
