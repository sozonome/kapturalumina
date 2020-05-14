import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonRow, IonProgressBar, IonButton, IonIcon, IonCol } from '@ionic/react'
import { removeSharp, addSharp } from 'ionicons/icons';
import shuffleSet from '../functions/shuffle';

export default function ComponentTestPage() {
  const rArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [prog, setProg] = useState(0.2);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Test Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonProgressBar color="primary" value={prog}></IonProgressBar>
              <IonButtons>
                <IonButton onClick={()=>setProg( (prog - 0.2) <= 0 ? 0 : prog - 0.2 )}>
                  <IonIcon icon={removeSharp}  />
                </IonButton>
                <IonButton onClick={()=> setProg( (prog+0.2) >= 1 ? 1 : prog+0.2)}>
                  <IonIcon icon={addSharp}  />
                </IonButton>
              </IonButtons>
              <IonButton onClick={()=> {
                console.log(shuffleSet(rArray))
                }}>Test Shuffle (see console.log)</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
