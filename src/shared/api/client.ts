import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { config } from "../config";
import { router } from "../../App";
const TOKEN_KEY = "access-token";

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
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
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      router.navigate({ to: "/login" });
    }
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export const apiClient = {
  get: <T>(path: string) => api.get<T>(path).then((res) => res.data),

  post: <T>(path: string, body: unknown) =>
    api.post<T>(path, body).then((res) => res.data),

  put: <T>(path: string, body: unknown) =>
    api.put<T>(path, body).then((res) => res.data),

  patch: <T>(path: string, body: unknown) =>
    api.patch<T>(path, body).then((res) => res.data),

  delete: <T>(path: string) => api.delete<T>(path).then((res) => res.data),
};
