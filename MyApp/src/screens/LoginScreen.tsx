// src/screens/LoginScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import {
  saveToken,
  loginCepat,
  detectBiometryType,
} from "../storage/auth";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Gate">;

const LoginScreen: React.FC = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const [biometryType, setBiometryType] = useState<any>(null);

  const nav = useNavigation<Nav>();

  // DETECT BIOMETRIC TYPE
  useEffect(() => {
    detectBiometryType().then((type) => {
      setBiometryType(type);
    });
  }, []);

  // --------------------------
  // SUBMIT (login manual)
  // --------------------------
  const submit = async () => {
    try {
      if (!u || !p) {
        setMsg("Masukkan username & password dulu.");
        return;
      }

      const fakeToken = `token-${Date.now()}`;
      await saveToken(fakeToken);

      setMsg("Login berhasil.");

      nav.reset({
        index: 0,
        routes: [{ name: "Gate" }],
      });
    } catch (e: any) {
      console.log("login err", e?.message || e);
      setMsg("Login gagal.");
    }
  };

  // --------------------------
  // LOGIN CEPAT BIOMETRIK
  // --------------------------
  const quickLogin = async () => {
    const token = await loginCepat();
    if (!token) {
      Alert.alert("Gagal", "Login cepat dibatalkan.");
      return;
    }

    nav.reset({
      index: 0,
      routes: [{ name: "Gate" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="username"
        value={u}
        onChangeText={setU}
        style={styles.input}
      />

      <TextInput
        placeholder="password"
        secureTextEntry
        value={p}
        onChangeText={setP}
        style={styles.input}
      />

      <Button title="Login" onPress={submit} />

      {/* ------------------------ */}
      {/* LOGIN CEPAT BUTTON */}
      {/* ------------------------ */}
      <View style={{ marginTop: 10 }}>
        <Button
          title={
            biometryType === "FaceID"
              ? "Login Cepat (Face ID)"
              : "Login Cepat (Biometrik)"
          }
          onPress={quickLogin}
        />
      </View>

      <Text style={{ marginTop: 8 }}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12, marginTop: 30 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
});

export default LoginScreen;
