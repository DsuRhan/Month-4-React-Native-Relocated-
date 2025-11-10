import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  category: string;
};

const sampleData = (category: string) =>
  Array.from({ length: 6 }).map((_, i) => ({
    id: `${category}-${i}`,
    title: `${category} Item ${i + 1}`,
    price: `Rp${(i + 1) * 25000}`,
  }));

export default function CategoryTab({ category }: Props) {
  // Fokus side-effect khusus untuk tab 'Diskon'
  useFocusEffect(
    useCallback(() => {
      if (category === "Diskon") {
        console.log("[Diskon] tab aktif — memuat data Diskon...");
      }
      return () => {
        if (category === "Diskon") {
          console.log("[Diskon] tab tidak lagi aktif — bersihkan listener/data...");
        }
      };
    }, [category])
  );

  const data = sampleData(category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", padding: 12 },
  card: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardPrice: { color: "#666", marginTop: 6 },
});
