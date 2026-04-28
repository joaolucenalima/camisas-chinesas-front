import { useMutation } from "@tanstack/react-query";
import { setAuthToken } from "@/shared/api/http-client";
import { refreshToken } from "../api/auth";

export function useRefreshTokenMutation() {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
    },
  });
}
