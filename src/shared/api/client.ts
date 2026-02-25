import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { config } from "../config";
import { router } from "../../App";
const TOKEN_KEY = "access-token";

const USER_ID_KEY = "user-id";

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  getUserId: () => localStorage.getItem(USER_ID_KEY),
  setUserId: (id: string) => localStorage.setItem(USER_ID_KEY, id),
  removeUserId: () => localStorage.removeItem(USER_ID_KEY),
};

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      router.navigate({ to: "/login" });
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(path: string, config?: import("axios").AxiosRequestConfig) => api.get<T>(path, config).then((res) => res.data),

  post: <T>(path: string, body: unknown, config?: import("axios").AxiosRequestConfig) =>
    api.post<T>(path, body, config).then((res) => res.data),

  put: <T>(path: string, body: unknown, config?: import("axios").AxiosRequestConfig) =>
    api.put<T>(path, body, config).then((res) => res.data),

  patch: <T>(path: string, body: unknown, config?: import("axios").AxiosRequestConfig) =>
    api.patch<T>(path, body, config).then((res) => res.data),

  delete: <T>(path: string, config?: import("axios").AxiosRequestConfig) => api.delete<T>(path, config).then((res) => res.data),
};
