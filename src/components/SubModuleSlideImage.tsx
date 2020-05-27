import React from 'react'
import { IonImg, IonText } from '@ionic/react'

export interface SubModuleSlideImageProps{
  img: {
    url: string;
    position: string;
    caption?: string;
  }
}

export default function SubModuleSlideImage(props:SubModuleSlideImageProps) {
  return (
    <>
      <IonImg src={props.img.url} />
      {
        props.img.caption?
        <IonText>
          <p>{props.img.caption}</p>
        </IonText>
        : null
      }
    </>
  )
}
