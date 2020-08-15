import React, { useRef, useEffect } from "react";
import {
  IonSlides,
  IonSlide,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";

import { PhotoAmico, FocusAmico, FocusPana } from "../assets";

const PublicHomeSlide = () => {
  const slider = useRef(null as any);

  useEffect(() => {
    slider.current.startAutoplay();
  }, []);

  return (
    <IonSlides
      style={{
        width: "100%",
        height: "80%",
        margin: "0 auto",
      }}
      scrollbar={true}
      ref={slider}
    >
      <IonSlide>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Punya kamera,
              <br />
              tapi belum tahu cara pakai nya?
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img className="glowFilter" src={PhotoAmico} alt="" />
          </IonCardContent>
        </IonCard>
      </IonSlide>
      <IonSlide>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Mau tahu cara mengambil
              <br />
              gambar yang lebih baik?
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img className="glowFilter" src={FocusAmico} alt="" />
          </IonCardContent>
        </IonCard>
        <IonText></IonText>
      </IonSlide>
      <IonSlide>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Yuk belajar
              <br />
              fotografi sekarang!
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img className="glowFilter" src={FocusPana} alt="" />
          </IonCardContent>
        </IonCard>
      </IonSlide>
    </IonSlides>
  );
};

export default PublicHomeSlide;
