import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { useContext } from "react";

import { ThemeContext } from "components/providers";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  email: string;
  handleChangeEmail: (event: CustomEvent) => void;
  handleConfirmRequest: (
    event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
  ) => void;
  onDismiss: (dismiss: boolean) => void;
};

const ForgotPasswordModal = ({
  isOpen,
  email,
  handleChangeEmail,
  handleConfirmRequest,
  onDismiss,
}: ForgotPasswordModalProps) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => onDismiss(false)}>
      <IonGrid class="forgotPasswordBox ion-padding ion-text-center">
        <IonRow>
          <IonCol>
            <IonText color={darkMode ? "light" : "dark"}>
              <h2>Atur ulang kata sandi</h2>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText color={darkMode ? "light" : "dark"}>
              <p>
                Masukkan e-mail akun Anda. Kami akan mengirimkan panduan
                selanjutnya untuk mengatur ulang kata sandi.
              </p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              color={darkMode ? "light" : "dark"}
              type="email"
              value={email}
              onIonChange={handleChangeEmail}
              placeholder="E-mail akun Anda"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonButton shape="round" onClick={handleConfirmRequest}>
              Konfirmasi Reset Password
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <IonButton
              shape="round"
              color="tertiary"
              onClick={() => onDismiss(false)}
            >
              Batal
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

export default ForgotPasswordModal;
