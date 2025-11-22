// src/utils/saveKTPBackup.ts
import {
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { launchCamera } from "react-native-image-picker";

export const requestStoragePermissionAndSave = async (): Promise<string | null> => {
  try {
    // iOS tidak butuh izin untuk save ke Photos
    if (Platform.OS !== "android") {
      return await openKTPBackupCamera(true);
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
      // Izinkan → save ke galeri
      return await openKTPBackupCamera(true);
    } else {
      // Ditolak → beri warning, lalu buka kamera biasa (tidak save)
      Alert.alert(
        "Peringatan",
        "Izin ditolak, foto tidak akan disimpan ke galeri publik."
      );
      return await openKTPBackupCamera(false);
    }
  } catch (e) {
    console.log("Permission Error:", e);
    return null;
  }
};

// buka kamera dengan opsi save / no save
const openKTPBackupCamera = (save: boolean): Promise<string | null> => {
  return new Promise((resolve) => {
    launchCamera(
      {
        mediaType: "photo",
        saveToPhotos: save,
        quality: 0.8,
      },
      (res) => {
        if (res.didCancel) return resolve(null);

        if (res.errorCode) {
          Alert.alert("Error", res.errorMessage);
          return resolve(null);
        }

        const asset = res.assets?.[0];
        if (!asset) return resolve(null);

        resolve(asset.uri ?? null);
      }
    );
  });
};
