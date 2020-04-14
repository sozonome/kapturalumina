import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react'

export default function SubModuleList(
  moduleTitle: string,
) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{moduleTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          
        }
      </IonContent>
    </IonPage>
  )
}
