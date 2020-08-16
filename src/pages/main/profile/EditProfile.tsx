import React, { useContext, useState, useEffect } from "react";
import {
  IonList,
  IonListHeader,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonTextarea,
  IonLoading,
} from "@ionic/react";
import { useHistory } from "react-router";

import { UserProfileContext } from "../../../components/providers";
import { presentToast } from "../../../components/Toast";

import { updateUserProfile } from "../../../firebase";

const EditProfile = () => {
  const { user } = useContext(UserProfileContext);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [insta, setInsta] = useState(user.socialLinks?.instagram);
  const [youTube, setYouTube] = useState(user.socialLinks?.youtube);
  const [website, setWebsite] = useState(user.socialLinks?.website);

  const [busy, setBusy] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setInsta(user.socialLinks?.instagram);
      setYouTube(user.socialLinks?.youtube);
      setWebsite(user.socialLinks?.website);
    }
    setBusy(false);
  }, [user]);

  const saveEdit = async () => {
    setBusy(true);
    if (name.length > 0) {
      const res = await updateUserProfile(name, bio, insta, youTube, website);
      if (res) {
        history.replace("/main/profile");
      } else {
        presentToast("Gagal melakukan update.");
      }
      setBusy(false);
    } else {
      setBusy(false);
      return presentToast("Nama tidak boleh kosong");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} message="Mohon Tunggu..." />
        <IonList style={{ paddingTop: "0" }} lines="none">
          <IonListHeader color="secondary">
            <h5>Detail Akun</h5>
          </IonListHeader>
          <IonItem>
            <IonLabel position="stacked">Nama</IonLabel>
            <IonInput
              onIonChange={(e) => {
                setName(e.detail.value!);
              }}
              value={name}
              type="text"
            />
          </IonItem>
          <IonItem disabled={true}>
            <IonLabel position="stacked">Alamat E-mail</IonLabel>
            <IonInput value={user.email} type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Deskripsi diri</IonLabel>
            <IonTextarea
              onIonChange={(e) => {
                setBio(e.detail.value!);
              }}
              value={bio}
              maxlength={80}
              placeholder={"Deskripsi singkat"}
              autoGrow
              onChange={() => {}}
            />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader color="tertiary">
            <h5>Tautan Media Sosial</h5>
          </IonListHeader>
          <IonItem>
            <IonLabel position="stacked">Instagram</IonLabel>
            <IonInput
              onIonChange={(e) => {
                setInsta(e.detail.value!);
              }}
              maxlength={30}
              value={insta}
              type="text"
              placeholder={"username Instagram Anda"}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">YouTube Channel Username</IonLabel>
            <IonInput
              onIonChange={(e) => {
                setYouTube(e.detail.value!);
              }}
              value={youTube}
              type="url"
              placeholder="(cth : mkbhd atau channel/UC00yHz_jzCw3o8lRVRrKMZw )"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Website</IonLabel>
            <IonInput
              onIonChange={(e) => {
                setWebsite(e.detail.value!);
              }}
              value={website}
              type="url"
              placeholder="URL Website Anda"
            />
          </IonItem>
        </IonList>
        <IonButton
          onClick={() => {
            saveEdit();
          }}
          expand="block"
          color="success"
          size="default"
        >
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
