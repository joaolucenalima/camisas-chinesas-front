import { userQueryKeys } from "@/entities/user/api/query-keys";
import { useCurrentUserQuery } from "@/entities/user/model/use-current-user-query";
import { type UserLogin } from "@/entities/user/model/types";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/model";
import {
  clearAuthToken,
  httpClient,
  registerLogoutCallback,
  setAuthToken,
} from "@/shared/api/http-client";
import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, useCallback, useEffect, useMemo } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading, isFetching } = useCurrentUserQuery();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const login = useCallback(
    async (input: UserLogin) => {
      const authSession = await loginMutation.mutateAsync(input);
      const { user, accessToken } = authSession;
      setAuthToken(accessToken);
      queryClient.setQueryData(userQueryKeys.me, user);
    },
    [loginMutation, queryClient],
  );

  const register = useCallback(
    async (input: UserLogin) => {
      const authSession = await registerMutation.mutateAsync(input);
      const { user, accessToken } = authSession;
      setAuthToken(accessToken);
      queryClient.setQueryData(userQueryKeys.me, user);
    },
    [queryClient, registerMutation],
  );

  const clearSession = useCallback(() => {
    clearAuthToken();
    queryClient.setQueryData(userQueryKeys.me, null);
  }, [queryClient]);

  const logout = useCallback(async () => {
    try {
      await httpClient.post<void>("auth/logout");
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    registerLogoutCallback(clearSession);
  }, [clearSession]);

  const isAuthLoading =
    isLoading || isFetching || loginMutation.isPending || registerMutation.isPending;

  const user = currentUser ?? null;

  const value = useMemo(
    () => ({
      login,
      register,
      logout,
      user,
      isAuthLoading,
    }),
    [isAuthLoading, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
