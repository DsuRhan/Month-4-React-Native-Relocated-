// src/utils/saveBase64Preview.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@profile:previewBase64";

/**
 * Simpan base64 ke storage
 */
export const saveBase64Preview = async (base64: string) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, base64);
    return true;
  } catch (e) {
    console.log("saveBase64Preview error:", e);
    return false;
  }
};

/**
 * Ambil base64 dari storage
 */
export const loadBase64Preview = async () => {
  try {
    const result = await AsyncStorage.getItem(PROFILE_KEY);
    return result || null;
  } catch (e) {
    console.log("loadBase64Preview error:", e);
    return null;
  }
};

/**
 * Hapus base64 kalau perlu
 */
export const clearBase64Preview = async () => {
  try {
    await AsyncStorage.removeItem(PROFILE_KEY);
  } catch (e) {
    console.log("clearBase64Preview error:", e);
  }
};
