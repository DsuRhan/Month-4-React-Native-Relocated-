// src/storage/cache.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const CATEGORY_CACHE_KEY = "category_cache_v1";
const TTL = 30 * 60 * 1000; // 30 menit

export const saveCategoryCache = async (category: string, data: any) => {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  await AsyncStorage.setItem(`${CATEGORY_CACHE_KEY}_${category}`, JSON.stringify(payload));
};

export const loadCategoryCache = async (category: string) => {
  const raw = await AsyncStorage.getItem(`${CATEGORY_CACHE_KEY}_${category}`);
  if (!raw) return null;

  try {
    const json = JSON.parse(raw);
    if (Date.now() - json.timestamp > TTL) return null;
    return json.data;
  } catch {
    return null;
  }
};
