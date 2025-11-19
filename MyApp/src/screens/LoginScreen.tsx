import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import apiClient from "../modules/api";
import { saveToken } from "../storage/auth";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Gate">;

const LoginScreen: React.FC = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  const nav = useNavigation<Nav>();

  const submit = async () => {
    try {
      const res = await apiClient.post("/auth/login", {
        username: u,
        password: p,
      });

      const token = res.data?.token;
      if (!token) throw new Error("Token kosong!");

      await saveToken(token);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="username" value={u} onChangeText={setU} style={styles.input} />
      <TextInput placeholder="password" value={p} secureTextEntry onChangeText={setP} style={styles.input} />
      <Button title="Login" onPress={submit} />
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
