import React, { useState } from "react";
import { StatusBar, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import { CartProvider, useCart } from "./contexts/CartContext";

function AppContent() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={styles.viewStyle}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {showCart ? "Your Cart" : "Mini E-Commerce"}
        </Text>
        <TouchableOpacity style={styles.cartBtn} onPress={() => setShowCart(!showCart)}>
          <Text style={styles.cartText}>{showCart ? "← Back" : `🛒 (${totalQty})`}</Text>
        </TouchableOpacity>
      </View>

      {showCart ? <CartScreen /> : <HomeScreen />}
    </View>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <AppContent />
      </SafeAreaProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cartBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  viewStyle:{ flex: 1}
});
