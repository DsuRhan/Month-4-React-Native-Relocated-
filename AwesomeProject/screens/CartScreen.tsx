import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.viewStyle}>
              <Text numberOfLines={2} style={styles.name}>
                {item.title}
              </Text>
              <Text style={styles.price}>
                ${item.price.toFixed(2)} x {item.quantity}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeText}>−</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty</Text>
        }
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 60, height: 60, resizeMode: "contain", marginRight: 10 },
  name: { fontSize: 14, fontWeight: "600" },
  price: { color: "#666", marginTop: 2 },
  removeBtn: {
    backgroundColor: "#FF4C4C",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  removeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  empty: { textAlign: "center", color: "#888", marginTop: 50 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    alignItems: "center",
  },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  clearBtn: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearText: { color: "#fff", fontWeight: "bold" },
  viewStyle:{ flex: 1}
});
