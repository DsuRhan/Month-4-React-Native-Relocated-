// api.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!config.headers) config.data.headers = {};
  config.headers["X-Client-Platform"] = "React-Native";
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const url = response.config?.url ?? "";
    if (url.includes("/auth/login") && response.status === 200) {
      return {
        ...response,
        data: { success: true, token: "simulated_token_xyz" },
        status: 200,
      };
    }
    return response;
  },
  (error) => {
    console.log("API error:", error?.message);
    return Promise.reject(error);
  }
);

export default apiClient;
