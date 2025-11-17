// ProductDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Product } from "../modules/types";
import apiClient from "../modules/api";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDetail = React.useCallback(async () => {
  setErrorMessage(null);
  try {
    const res = await apiClient.get(`/products/${productId}`);
    const data = res.data?.product ?? res.data;
    setProduct(data);
  } catch (err: any) {
    setErrorMessage(err.message || "Unknown error");
  } finally {
    setLoading(false);
  }
}, [productId]);


  useEffect(() => {
    loadDetail();
  }, [loadDetail]);
  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  if (errorMessage)
    return (
      <View style={styles.center}>
        <Text style={{ color: "crimson" }}>Gagal memuat detail produk</Text>
        <Text>{errorMessage}</Text>
        <Button title="Coba Lagi" onPress={loadDetail} />
      </View>
    );

  if (!product)
    return <View style={styles.center}><Text>Produk tidak ditemukan.</Text></View>;

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      {product.thumbnail ? <Image source={{ uri: product.thumbnail }} style={styles.thumb} /> : null}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button title="Checkout" onPress={() => navigation.navigate("CheckoutModal", { productId })} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  thumb: { width: "100%", height: 240, borderRadius: 8, backgroundColor: "#eee" },
  title: { fontSize: 20, fontWeight: "700", marginTop: 12 },
  price: { fontSize: 18, marginTop: 6, fontWeight: "700" },
  desc: { marginTop: 10, color: "#444" },
});

export default ProductDetailScreen;
