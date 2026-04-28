import type { AuthSession, User, UserLogin } from "@/entities/user/model/types";
import { httpClient } from "@/shared/api/http-client";

export async function login(payload: UserLogin) {
  const data = await httpClient.post<AuthSession>("auth/login", payload);
  return data;
}

export async function register(payload: UserLogin) {
  const data = await httpClient.post<AuthSession>("auth/register", payload);
  return data;
}

export async function getCurrentUser() {
  const data = await httpClient.get<User>("auth/me");
  return data;
}

export async function logout() {
  return httpClient.post("auth/logout");
}

export async function refreshToken() {
  const data = await httpClient.post<AuthSession>("auth/refresh-token");
  return data;
}
