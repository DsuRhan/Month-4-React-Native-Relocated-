import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart({ id, title, price, image })}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 10,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 120,
    borderRadius: 8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
