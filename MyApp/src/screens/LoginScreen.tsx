import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import apiClient from "../modules/api";

const LoginScreen: React.FC = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const res = await apiClient.post("/auth/login", { username: u, password: p });
      // our interceptor transforms successful login to { data: { success: true, token: 'simulated_token_xyz' } }
      const token = res.data?.token;
      console.log("Token diterima:", token);
      setMsg("Login berhasil. Cek console untuk token.");
    } catch (e: any) {
      console.log("login err", e?.message || e);
      setMsg("Login gagal.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login (Simulasi)</Text>
      <TextInput placeholder="username" value={u} onChangeText={setU} style={styles.input} />
      <TextInput placeholder="password" value={p} secureTextEntry onChangeText={setP} style={styles.input} />
      <Button title="Login" onPress={submit} />
      <Text style={{ marginTop: 8 }}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginBottom: 8, borderRadius: 6 },
});
export default LoginScreen;
