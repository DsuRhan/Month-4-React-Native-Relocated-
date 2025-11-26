import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../modules/types";

import { confirmPaymentBiometric } from "../storage/auth";

// ⬇️ Integrasi baru
import { useUserLocation } from "../hooks/useUserLocation";
import { getCurrentLocation } from "../utils/getCurrentLocation";

type Props = NativeStackScreenProps<RootStackParamList, "CheckoutModal">;

const CheckoutModal: React.FC<Props> = ({ route, navigation }) => {
  const productId = route.params?.productId;

  // ⬇️ gunakan hook lokasi (non-intrusif)
  const { coords, getLocation } = useUserLocation();

  // ⬇️ Ambil lokasi awal ketika modal dibuka (opsional & tidak mengganggu logika lama)
  useEffect(() => {
    getLocation();
  }, );

  const handleConfirm = async () => {
    // ⬇️ Ambil lokasi sekali lagi sebelum konfirmasi (untuk ongkir dll)
    const loc = await getCurrentLocation();
    console.log("Current location before purchase:", loc);

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

      {/* ⬇️ Info lokasi jika tersedia — tidak mengubah logika */}
      {coords && (
        <Text style={{ marginTop: 8 }}>
          Lokasi Anda: {coords.lat.toFixed(5)}, {coords.lon.toFixed(5)}
        </Text>
      )}

      <Button title="Confirm Purchase" onPress={handleConfirm} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CheckoutModal;
