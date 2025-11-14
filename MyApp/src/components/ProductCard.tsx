import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../modules/types";

type Props = {
  product: Product;
  onPress?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.thumb} />
      ) : null}
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text numberOfLines={2} style={styles.desc}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderColor: "#eee", alignItems: "center" },
  thumb: { width: 72, height: 72, borderRadius: 6, marginRight: 10, backgroundColor: "#f0f0f0" },
  body: { flex: 1 },
  title: { fontWeight: "600" },
  desc: { color: "#666", fontSize: 12 },
  price: { marginTop: 6, fontWeight: "700" },
});

export default ProductCard;
