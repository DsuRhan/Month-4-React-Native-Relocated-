import React from "react";
import { View, Text, Pressable } from "react-native";

export default function CheckoutModal({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Checkout Modal</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2f86eb",
          padding: 10,
          marginTop: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Tutup</Text>
      </Pressable>
    </View>
  );
}
