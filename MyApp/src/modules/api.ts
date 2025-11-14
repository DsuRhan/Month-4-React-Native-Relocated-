import axios from "axios";

// baseURL points to dummyjson
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Request interceptor -> auto add X-Client-Platform
apiClient.interceptors.request.use((config) => {
  if (!config.headers) config.data.headers = {};
  config.headers["X-Client-Platform"] = "React-Native";
  return config;
});

// Response interceptor -> transform login response
apiClient.interceptors.response.use(
  (response) => {
    // if this is login endpoint and status 200 -> simulate token transform
    const url = response.config?.url || "";
    if (url.includes("/auth/login") && response.status === 200) {
      return { data: { success: true, token: "simulated_token_xyz" }, status: 200, statusText: "OK", headers: response.headers, config: response.config };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
