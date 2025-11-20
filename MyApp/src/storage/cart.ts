// src/storage/cart.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart_items";
//cart type
export type CartData = {
  items: number[];
  total?: number;
  dummyItems?: number;
  updatedAt?: number;
};

export const addToCartById = async (id: number) => {
  const raw = await AsyncStorage.getItem(CART_KEY);
  let arr = raw ? JSON.parse(raw) : [];

  if (!arr.includes(id)) arr.push(id);

  await AsyncStorage.setItem(CART_KEY, JSON.stringify(arr));
  return arr;
};
export const loadCart = async (): Promise<CartData> => {
  const raw = await AsyncStorage.getItem(CART_KEY);

  if (!raw) {
    return { items: [] }; // ALWAYS object
  }

  try {
    const json = JSON.parse(raw);

    // If old data was array → convert it into new object format
    if (Array.isArray(json)) {
      return { items: json };
    }

    return json;
  } catch {
    return { items: [] };
  }
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
