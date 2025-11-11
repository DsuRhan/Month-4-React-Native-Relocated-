// src/screens/TopTabs/FavoriteTab.tsx
import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigation";

type NavProp = NativeStackNavigationProp<StackParamList, "TopTabs">;

type FavItem = { id: string; title: string };

export default function FavoriteTab() {
  const navigation = useNavigation<NavProp>();
  const [favorites, setFavorites] = useState<FavItem[]>([
    { id: "F1", title: "Produk Favorit 1" },
    { id: "F2", title: "Produk Favorit 2" },
  ]);

  const openDetail = (id: string) => {
    // navigasi ke DetailProduct di Stack (Level 3)
    navigation.navigate("DetailProduct", { id });
  };

  const removeFav = (id: string) =>
    setFavorites((prev) => prev.filter((i) => i.id !== id));

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Belum ada favorit</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable onPress={() => openDetail(item.id)} style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.sub}>Lihat detail</Text>
              </Pressable>

              <Pressable onPress={() => removeFav(item.id)} style={styles.remove}>
                <Text style={styles.removeText}>Hapus</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  empty: { textAlign: "center", marginTop: 40, color: "#666" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: { fontWeight: "600", marginBottom: 4 },
  sub: { color: "#666", fontSize: 12 },
  remove: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ffecec",
  },
  removeText: { color: "#b00", fontWeight: "600" },
});
