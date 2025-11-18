// src/storage/cart.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "persist_cart_v1";

export const loadCart = async () => {
  const raw = await AsyncStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : { items: [] };
};

// mergeItem → update kecil (jumlah)
export const updateCartMerge = async (partial: any) => {
  try {
    await AsyncStorage.mergeItem(CART_KEY, JSON.stringify(partial));
  } catch (e: any) {
    if (e?.message?.includes("Quota")) {
      throw new Error("Storage quota exceeded");
    }
    throw e;
  }
};
