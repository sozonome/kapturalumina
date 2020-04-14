import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react'

export default function Leaderboards() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Papan Peringkat</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  )
}
