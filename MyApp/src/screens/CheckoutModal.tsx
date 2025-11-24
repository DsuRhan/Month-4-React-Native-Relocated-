import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../modules/types";

import { confirmPaymentBiometric } from "../storage/auth";

type Props = NativeStackScreenProps<RootStackParamList, "CheckoutModal">;

const CheckoutModal: React.FC<Props> = ({ route, navigation }) => {
  const productId = route.params?.productId;

  const handleConfirm = async () => {
    const ok = await confirmPaymentBiometric();

    if (!ok) {
      Alert.alert("Transaksi Dibatalkan");
      return;
    }

    console.log("purchase simulated");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Checkout</Text>

      <Text style={{ marginTop: 8 }}>
        Product ID: {productId ?? "-"}
      </Text>

      <Button title="Confirm Purchase" onPress={handleConfirm} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};
export default CheckoutModal;
