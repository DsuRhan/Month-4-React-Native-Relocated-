// src/modules/api.ts
// src/modules/api.ts
import axios from "axios";
import * as Keychain from "react-native-keychain";

const SERVICE_API = "com.ecom:apiKey";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

// ------------------------------------------------------------
// EXPONENTIAL BACKOFF RETRY  (Untuk GET product/xxx)
// ------------------------------------------------------------
const sleep = (ms: number) => new Promise((res) => setTimeout((res as any), ms));

export const fetchWithRetry = async (
  url: string,
  retries = 3,
  delay = 1000
) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await apiClient.get(url); // jika sukses → langsung return
    } catch (err: any) {
      const isNetwork =
        err?.message?.includes("Network") ||
        err?.message?.includes("timeout") ||
        err?.code === "ECONNABORTED";

      if (!isNetwork) throw err; // bukan error jaringan → lempar

      attempt++;
      if (attempt >= retries) throw err; // habis retry → lempar ke ErrorBoundary

      const wait = delay * Math.pow(2, attempt - 1); // 1s → 2s → 4s
      console.log(`Retry attempt ${attempt} in ${wait}ms`);
      await sleep(wait);
    }
  }
};


// Request interceptor (API key only)
apiClient.interceptors.request.use(
  async (config) => {
    if (!config.headers) config.data.headers = {};
    config.headers["X-Client-Platform"] = "React-Native";

    try {
      const creds = await Keychain.getGenericPassword({ service: SERVICE_API });
      if (creds) {
        config.headers["X-API-Key"] = creds.password;
      }
    } catch (_) {
      console.log("Failed to load API key from Keychain", _);
      // API key optional → jangan blok request LOGIN lokal
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (tidak manipulasi login)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API error:", error?.message);
    return Promise.reject(error);
  }
);

// API key helper
export const saveApiKeyToKeychain = async (
  apiKey: string = "API_KEY_SECRET_XYZ"
) => {
  try {
    await Keychain.setGenericPassword("api_client", apiKey, {
      service: SERVICE_API,
    });
    return true;
  } catch {
    return false;
  }
};

export default apiClient;
