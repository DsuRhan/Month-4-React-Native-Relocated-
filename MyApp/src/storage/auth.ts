// src/storage/auth.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";

const TOKEN_KEY = "auth_token";
const PREFS_KEY = "user_prefs";
const NOTIF_KEY = "notif_status";

const SERVICE_TOKEN = "com.ecom:userToken";

// --------------------------------------------------------
// SAVE TOKEN
// --------------------------------------------------------
export const saveToken = async (token: string) => {
  await Keychain.setGenericPassword("user", token, { service: SERVICE_TOKEN });
};

// --------------------------------------------------------
// GET TOKEN (dipakai AuthGate)
// --------------------------------------------------------
export const getToken = async () => {
  try {
    const creds = await Keychain.getGenericPassword({ service: SERVICE_TOKEN });
    return creds ? creds.password : null;
  } catch (e: any) {
    const s = String(e).toLowerCase();

    if (s.includes("access denied") || s.includes("user not authenticated")) {
      try {
        await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
      } catch {}
      return null;
    }

    throw e;
  }
};

// --------------------------------------------------------
// HYBRID INITIAL LOADER (opsional, dipanggil App.tsx)
// --------------------------------------------------------
export const loadAppInitialData = async () => {
  try {
    const [tokenRes, prefs] = await Promise.all([
      Keychain.getGenericPassword({ service: SERVICE_TOKEN }),
      AsyncStorage.multiGet([PREFS_KEY, NOTIF_KEY]),
    ]);

    const map: any = {};

    map[TOKEN_KEY] = tokenRes ? tokenRes.password : null;

    prefs.forEach(([key, val]) => {
      map[key] = val;
    });

    return map;
  } catch (e: any) {
    console.log("Error loading initial app data:", e);
    return { [TOKEN_KEY]: null };
  }
};

// --------------------------------------------------------
// LOGOUT
// --------------------------------------------------------
export const logout = async () => {
  try {
    await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
  } catch {}

  await AsyncStorage.multiRemove([TOKEN_KEY, PREFS_KEY, NOTIF_KEY]);
};
