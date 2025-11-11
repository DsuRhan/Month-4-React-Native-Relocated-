// src/screens/TopTabs/ProductTab.tsx
import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigation";

type NavProp = NativeStackNavigationProp<StackParamList, "TopTabs">;

export default function ProductTab() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Lihat Detail Produk #A1"
        onPress={() => navigation.navigate("DetailProduct", { id: "A1" })}
      />
    </View>
  );
}
