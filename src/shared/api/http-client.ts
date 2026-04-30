import type { AuthSession } from "@/entities/user/model/types";
import axios, { AxiosHeaders, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

interface ApiSuccessResponse<T> {
  error: null;
  data: T;
}

interface ApiErrorResponse {
  error: string;
  data: null;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

type LogoutFn = () => void;
let logoutCallback: LogoutFn | null = null;

type AuthSessionUpdateFn = (session: AuthSession) => void;
let authSessionUpdateCallback: AuthSessionUpdateFn | null = null;

const AUTH_TOKEN_STORAGE_KEY = "auth_token";

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  delete httpClient.defaults.headers.common.Authorization;
}

export function registerLogoutCallback(fn: LogoutFn) {
  logoutCallback = fn;
}

export function registerAuthSessionCallback(fn: AuthSessionUpdateFn) {
  authSessionUpdateCallback = fn;
}

declare module "axios" {
  interface AxiosInstance {
    get<T = unknown>(url: string, config?: import("axios").AxiosRequestConfig): Promise<T>;
    post<T = unknown>(
      url: string,
      data?: unknown,
      config?: import("axios").AxiosRequestConfig,
    ): Promise<T>;
    put<T = unknown>(
      url: string,
      data?: unknown,
      config?: import("axios").AxiosRequestConfig,
    ): Promise<T>;
    patch<T = unknown>(
      url: string,
      data?: unknown,
      config?: import("axios").AxiosRequestConfig,
    ): Promise<T>;
    delete<T = unknown>(url: string, config?: import("axios").AxiosRequestConfig): Promise<T>;
  }
}

const defaultApiBaseUrl = "http://localhost:3333";
const apiBaseUrl = (import.meta.env.VITE_API_URL ?? defaultApiBaseUrl).replace(/\/$/, "");

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.headers.set("Authorization", `Bearer ${token}`);
  }

  if (config.params) {
    config.params = Object.fromEntries(
      Object.entries(config.params as Record<string, unknown>).filter(
        ([, v]) =>
          v !== null &&
          v !== undefined &&
          v !== "" &&
          !(typeof v === "object" && Object.keys(v).length === 0),
      ),
    );
  }

  return config;
});

let isRefreshing = false;
let refreshFailed = false;

let failedQueue: {
  resolve: () => void;
  reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });

  failedQueue = [];
}

async function refreshAuthSession() {
  const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Refresh failed with status ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<AuthSession>;

  if (body?.error) {
    throw new Error(body.error);
  }

  return (body?.data ?? body) as AuthSession;
}

httpClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const body = response.data;

    if (body?.error) {
      toast.error(body.error);
      return Promise.reject(new Error(body.error));
    }

    return (body?.data ?? body) as never;
  },
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;
    const body = error.response?.data as ApiResponse | undefined;

    if (status === 401 && !originalRequest._retry && !refreshFailed) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve(httpClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const authSession = await refreshAuthSession();
        const newToken = authSession.accessToken;

        setAuthToken(newToken);
        authSessionUpdateCallback?.(authSession);

        processQueue(null);

        return httpClient(originalRequest);
      } catch (refreshError) {
        refreshFailed = true;

        processQueue(refreshError);

        clearAuthToken();
        logoutCallback?.();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message = body?.error ?? error.message;
    if (status !== 401 && message) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);