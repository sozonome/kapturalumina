import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTextarea, IonGrid, IonRow, IonCol, IonProgressBar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText } from '@ionic/react';
import React from 'react';
import './Home.css';
import { book, camera } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle style={{marginTop:'12px'}}>Halo, User!</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard routerLink="/learn/camera-basic">
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={camera} /> Kamera
                  </IonCardTitle>
                  <IonCardSubtitle>Pengenalan dan Pengoperasian kamera</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText></IonText>
                </IonCardContent>
              </IonCard>
              <IonCard routerLink="/learn/camera-basic">
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={camera} /> Kamera
                  </IonCardTitle>
                  <IonCardSubtitle>Pengenalan Kamera</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText></IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );

  
};

export default Home;
