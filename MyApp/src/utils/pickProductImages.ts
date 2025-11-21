// src/utils/pickProductImages.ts
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const pickProductImages = async () => {
  return new Promise<void>((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 5,
        quality: 0.8,
        maxWidth: 600,
        maxHeight: 600,
      },
      async (res) => {
        try {
          if (res.didCancel) return resolve();
          if (res.errorCode) return reject(res.errorMessage);

          const mapped = (res.assets || []).map((a) => ({
            uri: a.uri ?? "",
            fileName: a.fileName ?? "unknown.jpg",
          }));

          await AsyncStorage.setItem(
            "@ecom:newProductAssets",
            JSON.stringify(mapped)
          );

          resolve();
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};
