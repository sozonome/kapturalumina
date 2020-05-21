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
import Swiper from "swiper";
import lumin01 from "../assets/images/lumin/lumin-001.png";
import lumin02 from "../assets/images/lumin/lumin-002.png";
import lumin03 from "../assets/images/lumin/lumin-003.png";

export default function PublicHomeSlide() {
  const slider = useRef(Swiper as any);

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
            <IonImg src={lumin01} />
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
            <IonImg src={lumin03} />
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
            <IonImg src={lumin02} />
          </IonCardContent>
        </IonCard>
      </IonSlide>
    </IonSlides>
  );
}
