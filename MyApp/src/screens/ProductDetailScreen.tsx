import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Product } from "../types/Product";

interface RouteParams {
  product: Product;
}

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { product } = route.params;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{ uri: product.thumbnail }}
        className="w-full h-64"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2">{product.title}</Text>
        <Text className="text-gray-500 mb-4">{product.category}</Text>
        <Text className="text-green-600 text-xl font-semibold mb-3">
          ${product.price}
        </Text>
        <Text className="text-gray-700 leading-5">{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
