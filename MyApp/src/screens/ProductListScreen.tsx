import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Product } from "../modules/types";
import ProductCard from "../components/ProductCard";
import { useNetInfoStatus } from "../hooks/useNetInfoStatus";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../modules/types";

type Props = NativeStackScreenProps<RootStackParamList, "MainTabs">; // not used directly, kept for typing

const ProductListScreen: React.FC<Props> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInternetReachable, connectionType } = useNetInfoStatus();

  useEffect(() => {
    if (isInternetReachable === false) {
      setLoading(false);
      return;
    }
    let mounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (mounted) setProducts(data.products ?? []);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("fetch aborted (timeout/unmount)");
        } else {
          console.log("fetch error:", err.message || err);
        }
      } finally {
        if (mounted) setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [isInternetReachable]);

  if (isInternetReachable === false) {
    return (
      <View style={styles.center}>
        <Text>Anda sedang Offline. Cek koneksi Anda.</Text>
        <Text style={{ marginTop: 6, color: "gray" }}>Tipe koneksi: {connectionType}</Text>
      </View>
    );
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(it) => it.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} onPress={() => { /* navigate handled from parent when used */ }} />}
      />
      <Text style={styles.footer}>Tipe koneksi: {connectionType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  footer: { textAlign: "center", padding: 8, color: "gray" },
});

export default ProductListScreen;
