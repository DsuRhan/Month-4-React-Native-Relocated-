// ProductListScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import { Product } from "../modules/types";
import ProductCard from "../components/ProductCard";
import { useNetInfoStatus } from "../hooks/useNetInfoStatus";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isInternetReachable, connectionType } = useNetInfoStatus();

  const fetchProductsWithRetry = React.useCallback(async (attempt = 1) => {
  setErrorMessage(null);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch("https://dummyjson.com/products", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeout);
    const data = await res.json();

    if (!res.ok) throw new Error("HTTP error " + res.status);

    setProducts(data.products ?? []);
  } catch (err: any) {
    if (attempt < 2) {
      console.log("Retry fetching... attempt:", attempt);
      return fetchProductsWithRetry(attempt + 1);
    }
    setErrorMessage(err.message);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    if (isInternetReachable === false) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProductsWithRetry();
  }, [isInternetReachable, fetchProductsWithRetry]);

  if (isInternetReachable === false) {
    return (
      <View style={styles.center}>
        <Text>Anda sedang Offline.</Text>
        <Text style={{ marginTop: 6, color: "gray" }}>Tipe koneksi: {connectionType}</Text>
      </View>
    );
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  if (errorMessage)
    return (
      <View style={styles.center}>
        <Text style={{ color: "crimson" }}>Gagal memuat produk.</Text>
        <Text style={{ marginTop: 6 }}>{errorMessage}</Text>
        <Button title="Coba Lagi" onPress={() => fetchProductsWithRetry()} />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(it) => it.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => { /* handled from HomeScreen */ }}
          />
        )}
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
