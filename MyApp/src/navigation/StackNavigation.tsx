// src/navigation/StackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigation";
import TopTabs from "./TopTabs";
import DetailProductScreen from "../screens/DetailProductScreen";

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTabs"
        component={TopTabs}
        options={{ headerTitle: "Product Section" }}
      />
      <Stack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        options={{ headerTitle: "Detail Produk" }}
      />
    </Stack.Navigator>
  );
}
