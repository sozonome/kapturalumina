import { presentTopToast } from "components/Toast";
import { fbase } from "./firebaseConfig";

export const requestPasswordReset = async (userEmail: string) => {
  try {
    await fbase.auth().sendPasswordResetEmail(userEmail);
    presentTopToast(
      "Permintaan Reset Password berhasil dilakukan. Cek e-mail anda untuk langkah selanjutnya",
      7000,
      "success"
    );
    return true;
  } catch (error) {
    presentTopToast(error.message, 4000, "warning");
  }
};
