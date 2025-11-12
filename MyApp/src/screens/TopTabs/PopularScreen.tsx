import React from "react";
import { View, Text, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function PopulerScreen({ navigation }: any) {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.getParent()?.setOptions?.({
        headerTitle: "Product ter Populer!",
      });
      return () => {
        navigation.getParent()?.getParent()?.setOptions?.({
          headerTitle: "Jelajahi Produk",
        });
      };
    }, [navigation])
  );

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => navigation.getParent()?.getParent()?.toggleDrawer()}
        style={{
          backgroundColor: "#2f86eb",
          margin: 16,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Toggle Drawer (via getParent)</Text>
      </Pressable>
    </View>
  );
}
