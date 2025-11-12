import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

const ProductGrid: React.FC<Props> = ({ products, onSelect }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => onSelect(item)} />
      )}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      ListFooterComponent={<View style={{ height: 80 }} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default ProductGrid;
