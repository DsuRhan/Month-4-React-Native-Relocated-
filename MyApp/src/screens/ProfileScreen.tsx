// src/screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { isAuthenticated, toggleAuth } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isAuthenticated ? (
        <>
          <Text>Harap Login untuk mengakses</Text>
          <Button title="Login" onPress={toggleAuth} />
        </>
      ) : (
        <>
          <Text>Selamat datang di halaman Profil!</Text>
          <Button title="Logout" onPress={toggleAuth} />
        </>
      )}
    </View>
  );
}
