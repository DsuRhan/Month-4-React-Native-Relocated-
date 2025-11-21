// src/utils/saveBase64Preview.ts
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const pickProfilePreview = async () => {
  launchImageLibrary(
    {
      mediaType: "photo",
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 300,
    },
    async (res) => {
      if (res.didCancel || res.errorCode) return;

      const base64 = res.assets?.[0]?.base64 ?? "";
      await AsyncStorage.setItem("@profile:previewBase64", base64);
    }
  );
};
