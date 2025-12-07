import { type ReactNode } from "react";
import { useModal } from "../hooks/use-modal";
import { Button } from "./button";

export type ConfirmDialogProps = {
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>{message}</div>

      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>

        <Button type="button" onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
