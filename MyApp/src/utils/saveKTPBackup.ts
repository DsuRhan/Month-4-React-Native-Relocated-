// src/utils/saveKTPBackup.ts
import {
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { launchCamera } from "react-native-image-picker";

export const requestStoragePermissionAndSave = async () => {
  try {
    if (Platform.OS !== "android") {
      // iOS tidak butuh permission untuk saveToPhotos
      return openCamera(true);
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Izin Penyimpanan",
        message:
          "Aplikasi membutuhkan izin untuk menyimpan foto KTP ke galeri sebagai cadangan.",
        buttonNeutral: "Nanti Saja",
        buttonNegative: "Tolak",
        buttonPositive: "Izinkan",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return openCamera(true); // akan save ke galeri
    } else {
      Alert.alert(
        "Peringatan",
        "Izin ditolak, foto tidak akan disimpan ke galeri publik."
      );
      return openCamera(false);
    }
  } catch (e) {
    console.log(e);
  }
};

const openCamera = (save: boolean) => {
  launchCamera(
    {
      mediaType: "photo",
      saveToPhotos: save,
      quality: 0.8,
    },
    (res) => {
      if (res.errorCode) {
        Alert.alert("Error", res.errorMessage);
      }
    }
  );
};
