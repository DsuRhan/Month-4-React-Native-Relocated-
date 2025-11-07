import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductGrid from "../components/ProductGrid";
import SafeFooter from "../components/SafeFooter";

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container,
          isLandscape ? styles.landscapeContainer : styles.portraitContainer,
        ]}
      >
        <Text style={styles.title}>Mini E-Commerce</Text>
        <ProductGrid />
        <SafeFooter />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
  },
  portraitContainer: {
    paddingHorizontal: 10,
  },
  landscapeContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 15,
  },
});
