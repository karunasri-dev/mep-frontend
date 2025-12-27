import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Refresh token promise to prevent multiple concurrent refresh attempts
let isRefreshing = false;
let failedQueue = [];
let isRedirecting = false; // Prevent multiple redirects

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Handle expired access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 1️⃣ If no response or not 401 → reject
    if (!err.response || err.response.status !== 401) {
      return Promise.reject(err);
    }

    // 2️⃣ Do NOT retry auth endpoints
    if (
      originalRequest.url.includes("/api/auth/login") ||
      originalRequest.url.includes("/api/auth/register") ||
      originalRequest.url.includes("/api/auth/refresh")
    ) {
      return Promise.reject(err);
    }

    // 3️⃣ Prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(err);
    }

    // 4️⃣ Queue requests if refresh in progress
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    // Do NOT refresh for session check
    if (originalRequest.url.includes("/api/auth/user")) {
      window.dispatchEvent(new CustomEvent("auth-logout"));
      return Promise.reject(err);
    }

    try {
      console.log("🔄 Access token expired, refreshing...");
      const refreshResponse = await api.post("/api/auth/refresh");

      // Dispatch custom event to notify AuthContext of successful refresh
      window.dispatchEvent(
        new CustomEvent("auth-refreshed", {
          detail: { user: refreshResponse.data.data.user },
        })
      );

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      console.log("❌ Refresh failed. Logging out.");

      // Dispatch event to notify AuthContext of logout
      window.dispatchEvent(new CustomEvent("auth-logout"));

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

export const registerAPI = (data) => {
  return api.post(`/api/auth/register`, data);
};

export const loginAPI = (data) => {
  return api.post(`/api/auth/login`, data);
};

export const forgotPasswordAPI = (mobileNumber) => {
  return api.post(`/api/auth/forgot-password`, { mobileNumber });
};

export const changePasswordAPI = (data) => {
  return api.patch(`/api/auth/changePassword`, data);
};

export async function verifyUser() {
  try {
    const response = await api.get(`/api/auth/user`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function logoutAPI() {
  try {
    await api.post(`/api/auth/logout`);
  } catch (error) {
    console.log("Logout request failed", error.message);
  }
}
