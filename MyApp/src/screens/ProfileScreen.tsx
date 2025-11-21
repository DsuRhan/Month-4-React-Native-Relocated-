// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Image, TouchableOpacity } from "react-native";
import { logout } from "../storage/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

const isValidUserId = (id?: string) => {
  if (!id) return false;
  return /^[a-zA-Z0-9_-]{3,30}$/.test(id);
};

const ProfileScreen: React.FC<any> = ({ navigation, route }: any) => {
  const [profileBase64, setProfileBase64] = useState<string | null>(null);

  const incomingUserId = route?.params?.userId;

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@profile:previewBase64");
      if (saved) setProfileBase64(saved);
    })();
  }, []);

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

  const pickProfileImage = () => {
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
        setProfileBase64(base64);
        await AsyncStorage.setItem("@profile:previewBase64", base64);
      }
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation?.reset({ index: 0, routes: [{ name: "Gate" }] });
    } catch (e) {
      console.log("Logout err", (e as any)?.message || e);
      Alert.alert("Logout gagal", "Gagal membersihkan data. Coba lagi.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Profile (Demo)</Text>

      <TouchableOpacity
        onPress={pickProfileImage}
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

      <Text style={{ marginTop: 8 }}>Nama: Master</Text>
      <Text>Email: master@example.com</Text>

      <Button title="Settings" onPress={() => navigation?.navigate("Settings")} />

      <View style={{ marginTop: 12 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;
