// src/utils/openCameraWithFallback.ts
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";

export const openCameraWithFallback = () => {
  launchCamera(
    { mediaType: "photo" },
    (res) => {
      if (res.errorCode === "camera_unavailable") {
        Alert.alert(
          "Kamera tidak bisa dipakai",
          "Gunakan galeri sebagai alternatif?",
          [
            { text: "Batal" },
            {
              text: "Buka Galeri",
              onPress: () =>
                launchImageLibrary({ mediaType: "photo" }, () => {}),
            },
          ]
        );
      }
    }
  );
};
