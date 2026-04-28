import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createShirt,
  updateShirt,
} from "@/entities/shirt/api/shirt-api";
import type { UpsertShirtInput } from "@/entities/shirt/model/types";
import { shirtQueryKeys } from "@/entities/shirt/api/query-keys";

type UseUpsertShirtMutationInput = {
  shirtId?: number;
  personId: string;
};

export function useUpsertShirtMutation({ shirtId, personId }: UseUpsertShirtMutationInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<UpsertShirtInput, "personId">) => {
      const fullPayload: UpsertShirtInput = {
        ...payload,
        personId,
      };

      if (shirtId) {
        return updateShirt(shirtId, fullPayload);
      }

      return createShirt(fullPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.byPerson(personId) });
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.all });
    },
  });
}
