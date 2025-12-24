import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Handle expired access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("Token expired, attempting refresh");
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest); // retry original call
      } catch {
        // refresh failed → redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;

export const registerAPI = (data) => {
  return api.post(`/api/auth/register`, data);
};

export const loginAPI = (data) => {
  return api.post(`/api/auth/login`, data);
};

export const logoutAPI = () => {
  return api.post(`/api/auth/logout`, {});
};

export const forgotPasswordAPI = (mobileNumber) => {
  return api.post(`/api/auth/forgot-password`, { mobileNumber });
};

export const verifyUserAPI = () => {
  return api.get(`/api/auth/user`);
};
