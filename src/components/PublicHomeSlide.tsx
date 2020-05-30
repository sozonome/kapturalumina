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
            <IonImg src={"https://res.cloudinary.com/irsnmt20/image/upload/v1590840124/shootnow/assets/Photo-amico_vpvqni.svg"} />
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
            <IonImg src={"https://res.cloudinary.com/irsnmt20/image/upload/v1590840357/shootnow/assets/Focus-amico_qrc5x8.svg"} />
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
            <IonImg src={"https://res.cloudinary.com/irsnmt20/image/upload/v1590840499/shootnow/assets/Focus-pana_zfvc2u.svg"} />
          </IonCardContent>
        </IonCard>
      </IonSlide>
    </IonSlides>
  );
}
