// src/screens/ProductDetailScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Product } from "../modules/types";
import fetchWithRetry from "../modules/api";

import {
  loadProductDetailCache,
  saveProductDetailCache,
} from "../storage/cache";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ----------------------------
  // LOAD DETAIL (Offline-first)
  // ----------------------------
  const loadDetail = useCallback(async () => {
    setErrorMessage(null);
    setLoading(true);

    // Step 1: coba ambil dari cache dulu
    const cached = await loadProductDetailCache(productId as any);
    if (cached) {
      setProduct(cached);
      setFromCache(true);
    }

    try {
      // Step 2: fetch fresh data
const res = await fetchWithRetry(`/products/${productId}`);
      const data = res.data?.product ?? res.data;

      setProduct(data);
      setFromCache(false);

      await saveProductDetailCache((productId as any), data);
    } catch (err: any) {
      if (!cached) {
        setErrorMessage(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  // --------- UI ---------
  if (loading && !product)
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
      />
    );

  if (errorMessage && !product)
    return (
      <View style={styles.center}>
        <Text style={{ color: "crimson" }}>Gagal memuat detail produk</Text>
        <Text>{errorMessage}</Text>
        <Button title="Coba Lagi" onPress={loadDetail} />
      </View>
    );

  if (!product)
    return (
      <View style={styles.center}>
        <Text>Produk tidak ditemukan.</Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      {fromCache && (
        <Text style={{ color: "gray", marginBottom: 6, fontSize: 12 }}>
          (Data dari cache — offline mode)
        </Text>
      )}

      {product.thumbnail && (
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.thumb}
        />
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <Button
        title="Checkout"
        onPress={() => navigation.navigate("CheckoutModal", { productId })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  thumb: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  title: { fontSize: 20, fontWeight: "700", marginTop: 12 },
  price: { fontSize: 18, marginTop: 6, fontWeight: "700" },
  desc: { marginTop: 10, color: "#444" },
});

export default ProductDetailScreen;
