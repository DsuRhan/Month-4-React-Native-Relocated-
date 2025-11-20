// src/screens/ProfileScreen.tsx
import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { logout } from "../storage/auth";

// If this screen is opened via deep link, params may exist in route.params.
// We'll accept optional route param `userId` and validate it.
const isValidUserId = (id?: string) => {
  if (!id) return false;
  // simple validation: alnum, underscore, dash, length 3-30
  return /^[a-zA-Z0-9_-]{3,30}$/.test(id);
};

const ProfileScreen: React.FC<any> = ({ navigation, route }: any) => {
  const incomingUserId = route?.params?.userId;

  useEffect(() => {
    if (incomingUserId) {
      if (!isValidUserId(incomingUserId)) {
        // invalid -> fallback to Home/Gate
        Alert.alert("Tautan tidak valid", "User ID tidak valid. Mengarahkan ke Home.");
        navigation?.navigate("Gate");
      } else {
        // valid -> optionally fetch profile data for that userId
        // if you want to show other user's profile, add logic here. For now we just log.
        console.log("Deep link open profile for:", incomingUserId);
        // If this app only allows viewing own profile, you should check auth and possibly block
      }
    }
  }, [incomingUserId, navigation]);

  const handleLogout = async () => {
    try {
      await logout();
      // reset navigation stack ke Gate (which will show login)
      navigation?.reset({ index: 0, routes: [{ name: "Gate" }] });
    } catch (e) {
      console.log("Logout error:", e);
      Alert.alert("Logout gagal", "Gagal membersihkan data. Coba lagi.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Profile (Demo)</Text>
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
