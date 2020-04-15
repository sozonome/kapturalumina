import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import SideMenu from './components/SideMenu';
import ComponentTestPage from './pages/ComponentTestPage';
import AboutPage from './pages/AboutPage';
import SubModulePage from './pages/SubModulePage';
import SubModuleListPage from './pages/SubModuleListPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId='main'>
        <SideMenu />
        <IonRouterOutlet id='main'>
          <Route path='/main' component={MainTabs} />
          <Route exact path="/learn/:chapterId" component={SubModuleListPage} />
          <Route exact path="/learn/:chapterId/:subModuleId" component={SubModulePage} />

          <Route path='/about' component={AboutPage} />
          <Route path='/test' component={ComponentTestPage} />
          {/* <Route path="/home" component={Home} exact={true} /> */}
          <Route exact path='/' render={() => <Redirect to='/main' />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
