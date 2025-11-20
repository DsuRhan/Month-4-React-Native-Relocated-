import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNetInfoStatus } from "../hooks/useNetInfoStatus";
import apiClient from "../modules/api";
import { loadCart, updateCartMerge } from "../storage/cart";


const CartScreen: React.FC = () => {
  const { connectionType } = useNetInfoStatus();

  
  // local UI state
  const [total, setTotal] = useState<number>(0);
  const [localCart, setLocalCart] = useState<any>(null);
  const [errorQuota] = useState<boolean>(false);

  // -------------------------------------------------------
  // 1. LOAD LOCAL CART (versi baru: loadCart selalu return object)
  // -------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const saved = await loadCart(); // ALWAYS returns object
        setLocalCart(saved);
        setTotal(saved.total ?? 0); //Property 'total' does not exist on type 'any[]'.
      } catch (e: any) {
        console.log("Load cart local err:", e?.message);
      }
    })();
  }, []);

  // -------------------------------------------------------
  // 2. POLLING ONLINE CART (stop if cellular)
  // -------------------------------------------------------
 useEffect(() => {
  let intervalId: number | null = null;
  let mounted = true;

  const normalizeCartTotal = (raw: any): number => {
    if (!raw) return 0;

    if (Array.isArray(raw)) {
      const first = raw[0];
      return first?.total ?? 0;
    }

    if (typeof raw === "object") {
      return raw.total ?? 0;
    }

    return 0;
  };

  const fetchCart = async () => {
    try {
      const res = await apiClient.get("/carts/1");

      const raw = res.data?.carts ?? res.data;
      const totalVal = normalizeCartTotal(raw);

      if (mounted) {
        setTotal(totalVal);

        await updateCartMerge({ total: totalVal });

        const localUpdated = await loadCart();
        setLocalCart(localUpdated);
      }
    } catch (e: any) {
      console.log("cart fetch err:", e?.message || e);
    }
  };

  if (connectionType !== "cellular") {
    fetchCart();
    intervalId = setInterval(fetchCart, 15000);
  }

  return () => {
    mounted = false;
    if (intervalId) clearInterval(intervalId);
  };
}, [connectionType]);


  // -------------------------------------------------------
  // 3. Simulate add item → merge dummyItems
  // -------------------------------------------------------
  const simulateAddItem = async () => {
    try {
      const newData = {
        updatedAt: Date.now(),
        dummyItems: (localCart?.dummyItems ?? 0) + 1,
      };

      await updateCartMerge(newData);

      // reload snapshot
      const updated = await loadCart();
      setLocalCart(updated);
    } catch (e: any) {
      console.log("simulate add item error:", e?.message);
    }
  };

  // -------------------------------------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      <Text>Total Belanja: {total}</Text>

      <Text style={{ marginTop: 8 }}>
        Connection: {connectionType}
      </Text>

      {connectionType === "cellular" && (
        <Text style={{ color: "red", marginTop: 6 }}>
          Polling dimatikan untuk hemat kuota.
        </Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="Tambah Item (Simulasi mergeItem)"
          onPress={simulateAddItem}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 13, color: "#555" }}>
          Local Cart Snapshot:
          {"\n"}
          {JSON.stringify(localCart, null, 2)}
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
