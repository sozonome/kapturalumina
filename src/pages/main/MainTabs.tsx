import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { homeSharp, listSharp, personSharp } from "ionicons/icons";
import { Route, Redirect } from "react-router";

import Home from "./learn/Home";
import Leaderboards from "./Leaderboards";
import Profile from "./profile/Profile";
import PrivateRoute from "../../components/routings/PrivateRoute";

const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/main" render={() => <Redirect to="/main/home" />} />

        <Route path="/main/home" render={() => <Home />} exact={true} />
        <PrivateRoute
          path="/main/leaderboards"
          component={Leaderboards}
          exact={true}
        />
        <PrivateRoute path="/main/profile" component={Profile} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/main/home">
          <IonIcon icon={homeSharp} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="leaderboards" href="/main/leaderboards">
          <IonIcon icon={listSharp} />
          <IonLabel>Papan Peringkat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/main/profile">
          <IonIcon icon={personSharp} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
