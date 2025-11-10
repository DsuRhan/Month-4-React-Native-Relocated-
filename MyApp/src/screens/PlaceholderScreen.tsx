import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlaceholderScreen({ route }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route?.name || "Screen"}</Text>
      <Text style={styles.sub}>This is a placeholder screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700" },
  sub: { marginTop: 8, color: "#666" },
});
