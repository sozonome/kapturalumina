import React, { useEffect, useState } from "react";
import { IonApp, IonSplitPane, IonSpinner } from "@ionic/react";
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

/* Theme variables */
import "./theme/variables.css";

// Components / Wrappers
import SideMenu from "./components/SideMenu";
import Routing from "./components/Routing";

// Redux
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import { createStore } from "redux";
import { getCurrentUser } from "./firebaseConfig";
import { Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/Auth";

const store = createStore(reducer);

const App: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [busy, setBusy] = useState<boolean>(true);

  // useEffect(() => {
  //   getCurrentUser().then((user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //     }
  //     setIsLoggedIn(false);
  //     setBusy(false);
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <IonApp>
        {/* {busy ? <IonSpinner /> : <MainWrapper />} */}
        <AuthProvider>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <SideMenu />
              <Routing />
            </IonSplitPane>
          </IonReactRouter>
        </AuthProvider>
      </IonApp>
    </Provider>
  );
};

export default App;
