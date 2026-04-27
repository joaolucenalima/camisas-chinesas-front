import { useState } from "react";
import type { ShirtStatus } from "@/entities/shirt/model/types";
import { useDeleteShirtMutation } from "@/features/select-shirt/api/use-delete-shirt-mutation";
import { useUpdateShirtStatusMutation } from "@/features/select-shirt/api/use-update-shirt-status-mutation";

type UseSelectShirtInput = {
  personId: string;
};

export function useSelectShirt({ personId }: UseSelectShirtInput) {
  const [statusPopoverIsOpen, setStatusPopoverIsOpen] = useState(false);
  const deleteMutation = useDeleteShirtMutation({ personId });
  const updateStatusMutation = useUpdateShirtStatusMutation({ personId });

  const changeStatus = (shirtId: number, status: ShirtStatus) => {
    updateStatusMutation.mutate({ shirtId, status });
    setStatusPopoverIsOpen(false);
  };

  const deleteById = (shirtId: number) => {
    deleteMutation.mutate(shirtId);
  };

  return {
    statusPopoverIsOpen,
    setStatusPopoverIsOpen,
    changeStatus,
    deleteById,
    isDeleting: deleteMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
}
