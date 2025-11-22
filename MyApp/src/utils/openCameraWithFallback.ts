// src/utils/openCameraWithFallback.ts
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";

export interface CameraImage {
  uri: string;
  fileName?: string;
  type?: string;
  base64?: string;
}

export const openCameraWithFallback = (): Promise<CameraImage | null> => {
  return new Promise((resolve) => {
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: true,
        quality: 0.7,
      },
      (res) => {
        if (res.didCancel) return resolve(null);

        // === CAMERA UNAVAILABLE ===
        if (res.errorCode === "camera_unavailable") {
          Alert.alert(
            "Kamera tidak bisa dibuka",
            "Gunakan galeri sebagai alternatif?",
            [
              { text: "Batal", onPress: () => resolve(null) },
              {
                text: "Buka Galeri",
                onPress: () => {
                  launchImageLibrary(
                    { mediaType: "photo", includeBase64: true },
                    (libRes) => {
                      if (libRes.didCancel || libRes.errorCode)
                        return resolve(null);

                      const a = libRes.assets?.[0];
                      if (!a) return resolve(null);

                      resolve({
                        uri: a.uri ?? "",
                        fileName: a.fileName,
                        type: a.type,
                        base64: a.base64,
                      });
                    }
                  );
                },
              },
            ]
          );
          return; // stop here
        }

        // === NORMAL CAMERA RESULT ===
        const asset = res.assets?.[0];
        if (!asset) return resolve(null);

        resolve({
          uri: asset.uri ?? "",
          fileName: asset.fileName,
          type: asset.type,
          base64: asset.base64,
        });
      }
    );
  });
};
