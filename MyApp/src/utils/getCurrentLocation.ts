// src/utils/getCurrentLocation.ts
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export async function getCurrentLocation() {
  // ---------------------
  // REQUEST PERMISSION
  // ---------------------
  if (Platform.OS === "android") {
    const ok = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Akses Lokasi Diperlukan",
        message: "Aplikasi memerlukan lokasi Anda untuk menghitung ongkir.",
        buttonPositive: "Izinkan",
        buttonNegative: "Tolak",
      }
    );

    if (ok !== PermissionsAndroid.RESULTS.GRANTED) {
      return null;
    }
  }

  // ---------------------
  // GET POSITION
  // ---------------------
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => resolve(null),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
