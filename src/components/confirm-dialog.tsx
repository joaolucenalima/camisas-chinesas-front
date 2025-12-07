import { type ReactNode } from 'react';
import { useModal } from '../hooks/use-modal';
import { Button } from './button';

export type ConfirmDialogProps = {
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
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
    <div className='flex flex-col gap-4'>
      <div>{message}</div>

      <div className='flex items-center justify-end gap-4'>
        <button type="button" onClick={handleCancel}
          className='text-lg cursor-pointer rounded-lg px-6 py-2 border border-zinc-700 bg-zinc-600 hover:bg-zinc-700 transition-colors'
        >
          Cancelar
        </button>

        <Button type="button" onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
