import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { logout } from "../storage/auth";

// utils
import { saveBase64Preview, loadBase64Preview } from "../utils/saveBase64Preview";
import { openCameraWithFallback } from "../utils/openCameraWithFallback";
import { uploadCameraImage } from "../utils/uploadCameraImage";

const isValidUserId = (id?: string) => {
  if (!id) return false;
  return /^[a-zA-Z0-9_-]{3,30}$/.test(id);
};

const ProfileScreen: React.FC<any> = ({ navigation, route }) => {
  const [profileBase64, setProfileBase64] = useState<string | null>(null);

  const incomingUserId = route?.params?.userId;

  // Load preview base64 from AsyncStorage
  useEffect(() => {
    (async () => {
      const saved = await loadBase64Preview();
      if (saved) setProfileBase64(saved);
    })();
  }, []);

  // Deep link validation
  useEffect(() => {
    if (incomingUserId) {
      if (!isValidUserId(incomingUserId)) {
        Alert.alert("Tautan tidak valid", "User ID tidak valid. Mengarahkan ke Home.");
        navigation?.navigate("Gate");
      } else {
        console.log("Deep link open profile for:", incomingUserId);
      }
    }
  }, [incomingUserId, navigation]);

  // pick from gallery — small preview only
  const pickProfileFromLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        maxWidth: 300,
        maxHeight: 300,
      },
      async (res) => {
        if (res.didCancel || res.errorCode) return;

        const base64 = res.assets?.[0]?.base64;
        if (!base64) return;

        setProfileBase64(base64);

        // save preview using util
        await saveBase64Preview(base64);
      }
    );
  };

  // open camera with fallback + upload (as required)
  const openCamera = async () => {
    try {
      const img = await openCameraWithFallback();
      if (!img) return;

      await uploadCameraImage(img);

      if (img.base64) {
        setProfileBase64(img.base64);
        await saveBase64Preview(img.base64);
      }
    } catch (err) {
      console.log("Camera err:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({ index: 0, routes: [{ name: "Gate" }] });
    } catch (e) {
      console.log("Logout err:", e);
      Alert.alert("Logout gagal", "Gagal membersihkan data. Coba lagi.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Profile</Text>

      {/* avatar */}
      <TouchableOpacity
        onPress={pickProfileFromLibrary}
        style={{ alignSelf: "center", marginTop: 20 }}
      >
        {profileBase64 ? (
          <Image
            source={{ uri: "data:image/jpeg;base64," + profileBase64 }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Pilih Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 10, alignSelf: "center" }}>
        <Button title="Ambil Foto dari Kamera" onPress={openCamera} />
      </View>

      <Text style={{ marginTop: 16 }}>Nama: Master</Text>
      <Text>Email: master@example.com</Text>

      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />

      <View style={{ marginTop: 12 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;
