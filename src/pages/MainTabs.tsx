import React, { useContext } from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import Home from './Home'
import Leaderboards from './Leaderboards'
import {homeSharp, listSharp, personSharp} from 'ionicons/icons';
import Profile from './Profile'
import PrivateRoute from '../components/PrivateRoute'

export default function MainTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/main" to="/main/home" />
        <Route path="/main/home" component={Home} exact={true} />
        <PrivateRoute path="/main/leaderboards" component={Leaderboards} exact={true} />
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
  )
}
