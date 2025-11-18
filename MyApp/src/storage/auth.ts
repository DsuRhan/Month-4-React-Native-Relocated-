//src/storage/auth.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import { Alert } from "react-native";

const TOKEN_KEY = "auth_token";
const PREFS_KEY = "user_prefs";
const NOTIF_KEY = "notif_status";

const SERVICE_TOKEN = "com.ecom:userToken";

export const saveToken = async (token: string) => {
  // Simpan token di Keychain (secure storage)
await Keychain.setGenericPassword("user", token, { service: SERVICE_TOKEN });
  // Tetap simpan tidak-sensitif atau flag jika perlu ke AsyncStorage (tidak diperlukan di sini)
};

export const loadAppInitialData = async () => {
  // Load token dari Keychain dan prefs/notif dari AsyncStorage secara paralel
  try {
    const tokenPromise = Keychain.getGenericPassword({ service: SERVICE_TOKEN });
    const prefsNotifPromise = AsyncStorage.multiGet([PREFS_KEY, NOTIF_KEY]);

    const [tokenRes, prefsResult] = await Promise.all([tokenPromise, prefsNotifPromise]);

    const map: any = {};
    // Isi token ke key yang sebelumya dipakai
    map[TOKEN_KEY] = tokenRes ? tokenRes.password : null;

    // map pref & notif (multiGet result is array of [key, val])
    prefsResult.forEach(([key, val]) => {
      map[key] = val;
    });

    return map;
  } catch (e: any) {
    // Jika terjadi access denied atau error lain, reset token dan beri tahu caller/UI
    const errStr = String(e).toLowerCase();
    if (errStr.includes("access denied") || errStr.includes("user not authenticated")) {
      // reset Keychain token supaya tidak menyimpan token yang tidak bisa diakses
      try {
        await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
      } catch (er) {
        // ignore
      }
      // alert di storage bukan ideal, tapi beri informasi minimal
      Alert.alert("Keamanan perangkat berubah", "Mohon login ulang.");
      // return minimal map without token
      return { [TOKEN_KEY]: null };
    }
    throw e;
  }
};

export const getToken = async () => {
  try {
    const creds = await Keychain.getGenericPassword({ service: SERVICE_TOKEN });
    return creds ? creds.password : null;
  } catch (e: any) {
    // tangani access denied secara aman: hapus token jika tidak bisa diakses
    const errStr = String(e).toLowerCase();
    if (errStr.includes("access denied") || errStr.includes("user not authenticated")) {
      try {
        await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
      } catch (er) {
        // ignore
      }
      return null;
    }
    throw e;
  }
};

export const logout = async () => {
  // Hapus token dari Keychain dulu, lalu remove AsyncStorage keys
  try {
    await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
  } catch (e) {
    // ignore
  }
  await AsyncStorage.multiRemove([TOKEN_KEY, PREFS_KEY, NOTIF_KEY]);
};
