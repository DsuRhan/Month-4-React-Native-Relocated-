import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNetInfoStatus } from "../hooks/useNetInfoStatus";
import apiClient from "../modules/api";
import { loadCart, updateCartMerge } from "../storage/cart"; // ★ Added


const CartScreen: React.FC = () => {
  const { connectionType } = useNetInfoStatus();

  // local UI state
  const [total, setTotal] = useState<number | null>(null);
  const [localCart, setLocalCart] = useState<any>(null);
  const [errorQuota, ] = useState<boolean>(false);


  // 1. load local cart first (cache-first)
  useEffect(() => {
    (async () => {
      try {
        const saved = await loadCart();
        if (saved) {
          setLocalCart(saved);
          setTotal(saved?.total ?? null);  
        }
      } catch (e: any) {
        console.log("Load cart local err:", e?.message);
      }
    })();
  }, []);


  // 2. polling online cart when not cellular
  useEffect(() => {
    let intervalId: number | null = null;
    let mounted = true;

    const fetchCart = async () => {
      try {
        const res = await apiClient.get("/carts/1");

        const data = res.data?.carts ?? res.data; 
        const totalVal =
          data?.total ?? res.data?.total ?? res.data;

        if (mounted) {
          setTotal(totalVal ?? null);

          // sync to local cache
          await updateCartMerge({ total: totalVal });

          // update local cart state
          const localUpdated = await loadCart();
          setLocalCart(localUpdated);
        }
      } catch (e: any) {
        console.log("cart fetch err", e?.message || e);
      }
    };

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


  // 3. example small change: +1 item to simulate mergeItem
  const simulateAddItem = async () => {
    try {
      const newData = {
        updatedAt: Date.now(),
        dummyItems: (localCart?.dummyItems ?? 0) + 1,
      };

      await updateCartMerge(newData);
    } catch (e: any) {
      console.log("simulate add item error:", e?.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      <Text>Total Belanja: {total ?? "Memuat..."}</Text>
      <Text style={{ marginTop: 8 }}>
        Connection: {connectionType}
      </Text>

      {connectionType === "cellular" && (
        <Text style={{ color: "red", marginTop: 6 }}>
          Polling dimatikan untuk hemat kuota.
        </Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Tambah Item (Simulasi mergeItem)" onPress={simulateAddItem} />
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 13, color: "#555" }}>
          Local Cart Snapshot: {JSON.stringify(localCart, null, 2)}
        </Text>
      </View>

      {errorQuota && (
        <Text style={{ color: "crimson", marginTop: 8, fontWeight: "600" }}>
          ⚠ Penyimpanan penuh (Quota Exceeded)
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: "700" },
});
export default CartScreen;
