import React, { useEffect } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonGrid, IonList } from '@ionic/react'

function Leaderboards() {

  useEffect(()=>{

  },[])

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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Papan Peringkat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>

        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Leaderboards;