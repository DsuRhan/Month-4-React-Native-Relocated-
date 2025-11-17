import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Product } from "../modules/types";
import ProductCard from "../components/ProductCard";

const HomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const fetchAll = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products", { signal: controller.signal });
        const data = await res.json();
        if (!mounted) return;
        const shuffled = (data.products ?? []).sort(() => Math.random() - 0.5);
        setItems(shuffled.slice(0, 8)); // random 8 items
      } catch (err: any) {
        console.log("Home fetch err", err?.name || err);
      } finally {
        if (mounted) setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Recommended</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          
            <ProductCard product={item} onPress={() => navigation?.navigate("ProductDetail", { productId: item.id })} />
          )}
      />
    </View>
  );
};

const styles = StyleSheet.create({ title: { fontSize: 18, fontWeight: "700", padding: 12 } });
export default HomeScreen;
