import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPerson,
  personQueryKeys,
  updatePerson,
} from "@/entities/person/api/person-api";
import type { UpsertPersonInput } from "@/entities/person/model/types";

type UseUpsertPersonMutationInput = {
  personId?: string;
};

export function useUpsertPersonMutation({ personId }: UseUpsertPersonMutationInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpsertPersonInput) => {
      if (personId) {
        return updatePerson(personId, payload);
      }

      return createPerson(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personQueryKeys.all });
    },
  });
}
