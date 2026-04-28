import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/api/auth";
import { getAuthToken } from "@/shared/api/http-client";
import { userQueryKeys } from "../api/query-keys";

export function useCurrentUserQuery() {
  const hasToken = !!getAuthToken();

  return useQuery({
    queryKey: userQueryKeys.me,
    queryFn: getCurrentUser,
    enabled: hasToken,
  });
}
