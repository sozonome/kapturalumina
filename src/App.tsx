import React, { useContext } from "react";
import {
  IonApp,
  IonSplitPane,
  setupConfig,
  useIonViewDidEnter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

// Native Plugins
import { Plugins } from "@capacitor/core";
import { AppMinimize } from "@ionic-native/app-minimize";

// Components / Wrappers
import AuthProvider from "./components/providers/AuthProvider";
import LearnProvider from "./components/providers/LearnProvider";
import UserProfileProvider from "./components/providers/UserProfileProvider";
import UserProgressProvider from "./components/providers/ProgressProvider";
import SideMenu from "./components/sidemenu/SideMenu";
import Routing from "./components/routings/Routing";

// Global CSS
import "typeface-inter";
import "typeface-karla";
import "./theme/styles/global.scss";

/* Theme variables */
import "./theme/variables.scss";
import ThemeProvider from "./components/providers/ThemeProvider";

const { App } = Plugins;

App.addListener("backButton", () => {
  AppMinimize.minimize();
});

setupConfig({
  hardwareBackButton: false,
});

const KapturaLumina: React.FC = () => {
  useIonViewDidEnter(() => {
    document.addEventListener(
      "backbutton",
      function (e) {
        console.log("disable back button");
      },
      false
    );
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <LearnProvider>
          <UserProfileProvider>
            <UserProgressProvider>
              <IonApp>
                <IonReactRouter>
                  <IonSplitPane contentId="main">
                    <SideMenu />
                    <Routing />
                  </IonSplitPane>
                </IonReactRouter>
              </IonApp>
            </UserProgressProvider>
          </UserProfileProvider>
        </LearnProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default KapturaLumina;
