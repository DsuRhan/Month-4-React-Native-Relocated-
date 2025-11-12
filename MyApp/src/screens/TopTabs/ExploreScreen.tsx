import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../../contexts/ProductContext";
import ProductGrid from "../../components/ProductGrid";
import { Product } from "../../types/Product";

const ExploreScreen: React.FC = () => {
  const { products, loading, error } = useProducts();
  const navigation = useNavigation<any>();

  const handleSelect = (product: Product) => {
    navigation.navigate("ProductDetail", { product });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProductGrid products={products} onSelect={handleSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});

export default ExploreScreen;
