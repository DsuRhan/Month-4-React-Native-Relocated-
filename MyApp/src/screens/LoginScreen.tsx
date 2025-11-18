// screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { saveToken } from "../storage/auth";

const LoginScreen: React.FC = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");

    // --- Custom login rule ---
    if (!u.trim()) {
      setMsg("Username tidak boleh kosong.");
      return;
    }
    if (p.length < 4) {
      setMsg("Password minimal 4 karakter.");
      return;
    }

    try {
      // Buat token simulasi (bebas, bisa JWT nanti)
      const fakeToken = `token_${Date.now()}_${u}`;

      // Simpan ke Keychain
      await saveToken(fakeToken);

      setMsg("Login berhasil. Token disimpan.");
    } catch (e: any) {
      console.log("login error:", e?.message || e);
      setMsg("Login gagal.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Login</Text>
      <TextInput
        placeholder="username"
        value={u}
        onChangeText={setU}
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={p}
        secureTextEntry
        onChangeText={setP}
        style={styles.input}
      />
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
