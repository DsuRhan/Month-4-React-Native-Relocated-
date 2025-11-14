import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetInfoStatus } from "../hooks/useNetInfoStatus";
import apiClient from "../modules/api";

const CartScreen: React.FC = () => {
  const { connectionType } = useNetInfoStatus();
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: number | null = null;
    let mounted = true;

    const fetchCart = async () => {
      try {
        // use dummy cart 1
        const res = await apiClient.get("/carts/1");
        const data = res.data?.carts ?? res.data;
        // dummyjson returns { id, products, total, discountedTotal, userId, totalProducts }
        const totalVal = data?.total ?? res.data?.total ?? res.data;
        if (mounted) setTotal(totalVal ?? null);
      } catch (e: any) {
        console.log("cart fetch err", e?.message || e);
      }
    };

    // Only poll if not cellular
    if (connectionType !== "cellular") {
      fetchCart();
      intervalId = setInterval(fetchCart, 15000);
    } else {
      console.log("Polling stopped due to cellular connection");
    }

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [connectionType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text>Total Belanja: {total ?? "Memuat..."}</Text>
      <Text style={{ marginTop: 8 }}>Connection: {connectionType}</Text>
      {connectionType === "cellular" && <Text style={{ color: "red", marginTop: 6 }}>Polling dimatikan untuk hemat kuota.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, title: { fontSize: 18, fontWeight: "700" } });
export default CartScreen;
