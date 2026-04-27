import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShirt, shirtQueryKeys } from "@/entities/shirt/api/shirt-api";

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
