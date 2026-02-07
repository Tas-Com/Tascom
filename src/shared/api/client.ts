import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { config } from "../config";

const TOKEN_KEY = "access_token";

const storage = {
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Fallback to sessionStorage
      sessionStorage.setItem(key, value);
    }
  },
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return sessionStorage.getItem(key);
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch {
      return;
    }
  },
};

export const tokenManager = {
  getToken: (): string | null => {
    return storage.get(TOKEN_KEY);
  },

  setToken: (token: string) => {
    storage.set(TOKEN_KEY, token);
  },

  removeToken: () => {
    storage.remove(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken();
  },
};

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach token
api.interceptors.request.use((axiosConfig: InternalAxiosRequestConfig) => {
  const token = tokenManager.getToken();
  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  return axiosConfig;
});

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      const authPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      const isAuthPage = authPaths.some((path) =>
        window.location.pathname.includes(path)
      );
      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export const apiClient = {
  get: <T>(path: string) => api.get<T>(path).then((res) => res.data),

  post: <T>(path: string, body?: unknown) =>
    api.post<T>(path, body).then((res) => res.data),

  put: <T>(path: string, body: unknown) =>
    api.put<T>(path, body).then((res) => res.data),

  patch: <T>(path: string, body: unknown) =>
    api.patch<T>(path, body).then((res) => res.data),

  delete: <T>(path: string) => api.delete<T>(path).then((res) => res.data),
};
