import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { config } from "../config";
const TOKEN_KEY = "access-token";

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Strict; Secure`;
};

const getCookie = (name: string): string | null => {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return value ? decodeURIComponent(value) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict; Secure`;
};

export const tokenManager = {
  getToken: () => getCookie(TOKEN_KEY),
  setToken: (token: string, expiryDays = 7) =>
    setCookie(TOKEN_KEY, token, expiryDays),
  removeToken: () => deleteCookie(TOKEN_KEY),
  isAuthenticated: () => !!getCookie(TOKEN_KEY),
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
      window.location.href = "/login";
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
