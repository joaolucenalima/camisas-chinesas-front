import { useModal } from "@/app/providers/modal/use-modal";
import { useUpsertPersonMutation } from "@/features/add-person/api/use-upsert-person-mutation";

export function useAddPerson(personId?: string) {
  const { closeModal } = useModal();
  const mutation = useUpsertPersonMutation({ personId });

  const submitPerson = (name: string) => {
    mutation.mutate(
      { name },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return {
    submitPerson,
    isPending: mutation.isPending,
  };
}
