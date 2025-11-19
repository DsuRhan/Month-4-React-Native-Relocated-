import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { logout } from "../storage/auth";

const ProfileScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await logout();
      // reset navigation stack ke Login
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
