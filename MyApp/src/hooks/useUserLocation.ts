// src/hooks/useUserLocation.ts
import { useEffect, useState, useRef } from "react";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import geolocation from "@react-native-community/geolocation";

export const useUserLocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  // ------------------------------
  // REQUEST LOCATION PERMISSION
  // ------------------------------
  const requestPermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Izin Lokasi",
          message: "Kami butuh lokasi Anda untuk menghitung ongkir dan menemukan toko terdekat.",
          buttonPositive: "Izinkan",
          buttonNegative: "Tolak",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      Alert.alert("Error", "Gagal meminta izin lokasi", e as any);
      return false;
    }
  };

  // ------------------------------
  // GET LOCATION ONE TIME
  // ------------------------------
  const getLocation = async () => {
    const ok = await requestPermission();
    if (!ok) {
      setError("Izin lokasi ditolak");
      return null;
    }

    return new Promise((resolve) => {
      geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const data = { lat: latitude, lon: longitude };
          setCoords(data);
          resolve(data);
        },
        (err) => {
          setError(err.message);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };

  // ------------------------------
  // START LIVE TRACKING
  // ------------------------------
  const startTracking = async () => {
    const ok = await requestPermission();
    if (!ok) {
      setError("Izin lokasi ditolak");
      return;
    }

    watchId.current = geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 20,
      }
    );
  };

  // ------------------------------
  // CLEANUP WHEN UNMOUNT
  // ------------------------------
  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return {
    coords,
    error,
    getLocation,
    startTracking,
  };
};
