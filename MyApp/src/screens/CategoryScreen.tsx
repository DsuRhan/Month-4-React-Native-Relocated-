import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigation";

type NavProp = NativeStackNavigationProp<StackParamList, "TopTabs">;

const categories = [
  { id: "1", name: "Elektronik" },
  { id: "2", name: "Fashion" },
  { id: "3", name: "Peralatan Rumah" },
  { id: "4", name: "Buku & Alat Tulis" },
];

export default function CategoryScreen() {
  const navigation = useNavigation<NavProp>();

  const goToCategory = (categoryId: string) => {
    navigation.navigate("DetailProduct", { id: categoryId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.category}
            onPress={() => goToCategory(item.id)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>Lihat produk</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  category: {
    padding: 14,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  name: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },
});
