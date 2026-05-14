import { userQueryKeys } from "@/entities/user/api/query-keys";
import { useCurrentUserQuery } from "@/entities/user/model/use-current-user-query";
import { type AuthSession } from "@/entities/user/model/types";
import {
  clearAuthToken,
  httpClient,
  registerAuthSessionCallback,
  registerLogoutCallback,
  setAuthToken,
} from "@/shared/api/http-client";
import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, useCallback, useEffect, useMemo } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading, isFetching } = useCurrentUserQuery();

  const setUserData = useCallback(
    (authSession: AuthSession) => {
      setAuthToken(authSession.accessToken);
      queryClient.invalidateQueries();
      queryClient.setQueryData(userQueryKeys.me, authSession.user);
    },
    [queryClient],
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
    registerAuthSessionCallback((authSession) => {
      queryClient.setQueryData(userQueryKeys.me, authSession.user);
    });
  }, [clearSession, queryClient]);

  const isAuthLoading = isLoading || isFetching;

  const value = useMemo(
    () => ({
      setUserData,
      logout,
      user: currentUser ?? null,
      isAuthLoading,
    }),
    [setUserData, isAuthLoading, logout, currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
