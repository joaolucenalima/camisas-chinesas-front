import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShirt } from "@/entities/shirt/api/shirt-api";
import { shirtQueryKeys } from "@/entities/shirt/api/query-keys";

type UseDeleteShirtMutationInput = {
  personId: string;
};

export function useDeleteShirtMutation({ personId }: UseDeleteShirtMutationInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shirtId: number) => deleteShirt(shirtId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.byPerson(personId) });
      queryClient.invalidateQueries({ queryKey: shirtQueryKeys.all });
    },
  });
}
