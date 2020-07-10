import React from "react";
import { IonText } from "@ionic/react";

export interface SubModuleSlideImageProps {
  img: {
    url: string;
    position: string;
    caption?: string;
  };
}

export default function SubModuleSlideImage(props: SubModuleSlideImageProps) {
  return (
    <>
      <img src={props.img.url} />
      {props.img.caption ? (
        <IonText>
          <p>{props.img.caption}</p>
        </IonText>
      ) : null}
    </>
  );
}
