import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShirtStatus } from "@/entities/shirt/api/shirt-api";
import type { ShirtStatus } from "@/entities/shirt/model/types";
import { shirtQueryKeys } from "@/entities/shirt/api/query-keys";

type UseUpdateShirtStatusMutationInput = {
  personId: string;
};

type UpdateShirtStatusInput = {
  shirtId: number;
  status: ShirtStatus;
};

export function useUpdateShirtStatusMutation({ personId }: UseUpdateShirtStatusMutationInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shirtId, status }: UpdateShirtStatusInput) => updateShirtStatus(shirtId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.byPerson(personId) });
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.all });
    },
  });
}
