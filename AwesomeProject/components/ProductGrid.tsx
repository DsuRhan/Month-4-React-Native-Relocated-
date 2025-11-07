import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.log("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal={isLandscape}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.grid,
        isLandscape ? styles.gridLandscape : styles.gridPortrait,
      ]}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          image={p.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridPortrait: {
    flexDirection: "column",
    paddingBottom: 20,
  },
  gridLandscape: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
