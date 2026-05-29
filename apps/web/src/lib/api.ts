import axios, { AxiosError, AxiosInstance } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
  timeout: 15000,
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("velora_access", token);
    else localStorage.removeItem("velora_access");
  }
}

export function getAccessToken() {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("velora_access");
  }
  return accessToken;
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/auth/refresh`,
      {},
      { withCredentials: true }
    );
    const token = res.data?.accessToken as string | undefined;
    if (token) {
      setAccessToken(token);
      return token;
    }
    return null;
  } catch {
    return null;
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      refreshing ??= refreshAccessToken().finally(() => {
        refreshing = null;
      });
      const token = await refreshing;
      if (token) {
        original.headers = original.headers ?? {};
        (original.headers as Record<string, string>).Authorization =
          `Bearer ${token}`;
        return api.request(original);
      }
    }
    return Promise.reject(error);
  }
);
