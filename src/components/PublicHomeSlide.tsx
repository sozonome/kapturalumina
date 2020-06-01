import React, { useRef, useEffect } from "react";
import {
  IonSlides,
  IonSlide,
  IonText,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
import { PhotoAmico, FocusAmico, FocusPana } from "../assets/assetsref";

export default function PublicHomeSlide() {
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
            <img src={PhotoAmico} />
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
            <img src={FocusAmico} />
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
            <img src={FocusPana} />
          </IonCardContent>
        </IonCard>
      </IonSlide>
    </IonSlides>
  );
}
