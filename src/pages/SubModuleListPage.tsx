import React from 'react'
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react'

export default function SubModuleListPage(
  chapterTitle: string,
) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{chapterTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          
        }
      </IonContent>
    </IonPage>
  )
}
