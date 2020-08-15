import React from "react";
import { IonText } from "@ionic/react";

export interface SubModuleSlideImageProps {
  img: {
    url: string;
    position: string;
    caption?: string;
  };
}

const SubModuleSlideImage = (props: SubModuleSlideImageProps) => {
  return (
    <>
      <img src={props.img.url} alt="" />
      {props.img.caption ? (
        <IonText>
          <p>{props.img.caption}</p>
        </IonText>
      ) : null}
    </>
  );
};

export default SubModuleSlideImage;
