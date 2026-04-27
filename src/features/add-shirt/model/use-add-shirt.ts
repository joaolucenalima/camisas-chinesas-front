import type { Shirt } from "@/entities/shirt/model/types";
import { useModal } from "@/shared/lib/modal/use-modal";
import { useUpsertShirtMutation } from "@/features/add-shirt/api/use-upsert-shirt-mutation";

export type SubmitShirtInput = {
  title: string;
  size: string;
  link: string;
  priceInCents: number;
  image?: File;
};

type UseAddShirtInput = {
  personId: string;
  shirt?: Shirt;
};

export function useAddShirt({ personId, shirt }: UseAddShirtInput) {
  const { closeModal } = useModal();
  const mutation = useUpsertShirtMutation({ shirtId: shirt?.id, personId });

  const submitShirt = (payload: SubmitShirtInput) => {
    mutation.mutate(payload, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return {
    submitShirt,
    isPending: mutation.isPending,
  };
}
