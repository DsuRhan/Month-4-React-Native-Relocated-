// src/screens/DetailProductScreen.tsx
import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../types/navigation";

export default function DetailProductScreen() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Soal 3: Reset Stack dan Tutup Drawer */}
      <Button
        title="Reset ke TopTabs & Tutup Drawer"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
          });
          navigation.closeDrawer();
        }}
      />
      {/* Soal 4: Kembali ke Drawer Home */}
      <Button
        title="Kembali ke Drawer Home"
        onPress={() => navigation.getParent()?.goBack()}
      />
    </View>
  );
}
