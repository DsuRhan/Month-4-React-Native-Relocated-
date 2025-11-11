import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Produk A", quantity: 2 },
    { id: 2, name: "Produk B", quantity: 1 },
  ]);

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
        Keranjang Belanja
      </Text>

      {cart.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Keranjang masih kosong
        </Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 8,
                marginBottom: 20,
              }}
            >
              <Text>{item.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button title="-" onPress={() => decreaseQuantity(item.id)} />
                <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                <Button title="+" onPress={() => increaseQuantity(item.id)} />
              </View>
            </View>
          )}
        />
      )}

      <View style={{ marginTop: 20,marginBottom:40 }}>
        <Button title="Hapus Semua" onPress={clearCart} />
      </View>
    </View>
  );
}
