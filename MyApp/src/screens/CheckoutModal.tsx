import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../modules/types";

type Props = NativeStackScreenProps<RootStackParamList, "CheckoutModal">;

const CheckoutModal: React.FC<Props> = ({ route, navigation }) => {
  const productId = route.params?.productId;
  return (
    <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Checkout</Text>
      <Text style={{ marginTop: 8 }}>Product ID: {productId ?? "-"}</Text>
      <Button title="Confirm Purchase" onPress={() => { console.log("purchase simulated"); navigation.goBack(); }} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};
export default CheckoutModal;
