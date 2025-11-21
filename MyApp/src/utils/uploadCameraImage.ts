// src/utils/uploadCameraImage.ts
import { launchCamera } from "react-native-image-picker";

export const uploadCameraImage = async (setUploading: (v: boolean) => void) => {
  launchCamera(
    { mediaType: "photo", quality: 0.7 },
    async (res) => {
      if (res.didCancel || res.errorCode) return;

      const asset = res.assets?.[0];
      if (!asset) return;

      const data = new FormData();
      data.append("file", {
        uri: asset.uri,
        name: asset.fileName ?? "image.jpg",
        type: asset.type ?? "image/jpeg",
      });

      setUploading(true);

      try {
        await fetch("https://example.com/upload", {
          method: "POST",
          body: data,
        });
      } catch (error) {
        console.log("UPLOAD ERROR:", error);
      } finally {
        setUploading(false);
      }
    }
  );
};
