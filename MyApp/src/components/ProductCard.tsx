import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import { Product } from "../types/Product";

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {product.category}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    margin: 4,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  category: {
    fontSize: 12,
    color: "#777",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#22c55e",
    marginTop: 4,
  },
});

export default ProductCard;
