import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  onPress?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  onPress,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(id)}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>Rp {price.toLocaleString("id-ID")}</Text>
        <Pressable
          style={styles.button}
          onPress={() => onAddToCart?.(id)}
        >
          <Text style={styles.btnText}>+ Keranjang</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  price: {
    color: "#2a9d8f",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#264653",
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 6,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
});
