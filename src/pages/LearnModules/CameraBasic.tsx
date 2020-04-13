import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonBackButton } from '@ionic/react'

export default function CameraBasic() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Pengenalan Kamera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      </IonContent>
    </IonPage>
  )
}
