// src/storage/auth.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import{ isSensorAvailable, simplePrompt } from "@sbaiahmed1/react-native-biometrics";
import { Alert } from "react-native";


const TOKEN_KEY = "auth_token";
const PREFS_KEY = "user_prefs";
const NOTIF_KEY = "notif_status";
const TOKEN_EXP_KEY = "token_expired_at";

const SERVICE_TOKEN = "com.ecom:userToken";

// ========================================================
// 1) SAVE TOKEN (manual login)
// ========================================================
export const saveToken = async (token: string) => {
  await Keychain.setGenericPassword("user", token, { service: SERVICE_TOKEN });
};

// ========================================================
// SAVE TOKEN EXPIRY (timestamp)
// ========================================================
export const saveTokenExpiry = async (timestamp: number) => {
  await AsyncStorage.setItem(TOKEN_EXP_KEY, String(timestamp));
};

// ========================================================
// GET TOKEN EXPIRY
// ========================================================
export const getTokenExpiry = async (): Promise<number | null> => {
  const raw = await AsyncStorage.getItem(TOKEN_EXP_KEY);
  if (!raw) return null;

  const asNum = Number(raw);
  return isNaN(asNum) ? null : asNum;
};

// ========================================================
// GET TOKEN
// ========================================================
export const getToken = async () => {
  try {
    const creds = await Keychain.getGenericPassword({
      service: SERVICE_TOKEN,
    });
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

// ========================================================
// CHECK EXPIRED TOKENS
// ========================================================
export const isTokenExpired = async (): Promise<boolean> => {
  const exp = await getTokenExpiry();
  if (!exp) return false;

  return Date.now() > exp;
};

export const validateTokenOrLogout = async () => {
  const expired = await isTokenExpired();
  if (!expired) return true;

  await logout();
  return false;
};

// ========================================================
// HYBRID INITIAL LOADING
// ========================================================
export const loadAppInitialData = async () => {
  try {
    const [tokenRes, prefs, exp] = await Promise.all([
      Keychain.getGenericPassword({ service: SERVICE_TOKEN }),
      AsyncStorage.multiGet([PREFS_KEY, NOTIF_KEY]),
      AsyncStorage.getItem(TOKEN_EXP_KEY),
    ]);

    const map: any = {};

    map[TOKEN_KEY] = tokenRes ? tokenRes.password : null;
    map[TOKEN_EXP_KEY] = exp && !isNaN(Number(exp)) ? Number(exp) : null;

    prefs.forEach(([key, val]) => {
      try {
        map[key] = val ? val : null;
      } catch {
        map[key] = null;
      }
    });

    return map;
  } catch (e) {
    console.log("Error loading initial app data:", e);
    return { [TOKEN_KEY]: null };
  }
};

// ========================================================
// LOGOUT & SECURITY RESET
// ========================================================
export const logout = async () => {
  try {
    await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
  } catch {}

  await AsyncStorage.multiRemove([
    TOKEN_KEY,
    PREFS_KEY,
    NOTIF_KEY,
    TOKEN_EXP_KEY,
  ]);
};

// ======================================================================
// ===============   BIOMETRICS SECTION (NEW)   =========================
// ======================================================================

// -------------------------------------------------------
// DETECT BIOMETRY TYPE (FaceID / TouchID / Biometrics)
// -------------------------------------------------------
export const detectBiometryType = async () => {
  const res = await isSensorAvailable();

  if (!res.available) return null;

  return res.biometryType; // FaceID / TouchID / Biometrics
};

// -------------------------------------------------------
// LOGIN CEPAT (Biometric + Keystore)
// -------------------------------------------------------
export const loginCepat = async () => {
  try {
    const sensor = await isSensorAvailable();

    // DEVICE PUNYA SENSOR, TAPI BELUM ENROLL
    if (!sensor.available && sensor.error === "NotEnrolled") {
      Alert.alert(
        "Belum Terdaftar",
        "Sidik jari belum diatur di HP ini. Silakan atur dulu."
      );
      return null;
    }

    // PROMPT
    const prompt = await simplePrompt(
      "Otentikasi untuk Login Cepat"
    );

    if (!prompt.success) return null;

    // Ambil token dari Keychain
    const creds = await Keychain.getGenericPassword({
      service: SERVICE_TOKEN,
    });

    if (!creds) return null;

    return creds.password;
  } catch (e: any) {
    const msg = (e?.message || "").toLowerCase();

    // FORCE LOGOUT PADA LOCKOUT
    if (msg.includes("lockout") || msg.includes("locked")) {
      // Kenapa dihapus?
      // → Demi keamanan, saat biometrik dikunci oleh sistem, kita anggap ada percobaan akses ilegal.
      try {
        await Keychain.resetGenericPassword({ service: SERVICE_TOKEN });
      } catch {}

      Alert.alert("Akun Diamankan", "Sensor terkunci. Silakan login manual.");

      return null;
    }

    return null;
  }
};

// -------------------------------------------------------
// CONFIRMATION FOR PAYMENT (Rp 500.000)
// -------------------------------------------------------
export const confirmPaymentBiometric = async () => {
  try {
    const res = await simplePrompt(
      "Konfirmasi Transfer Rp 500.000"
    );

    return res.success;
  } catch (e) {
    console.log("Biometric payment confirm err:", e);
    return false;
  }
};
