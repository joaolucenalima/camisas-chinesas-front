import { createContext, type ReactNode } from "react";

export type ModalState = {
  title: string;
  modalElement: ReactNode;
} | null;

export type ModalContextValue = {
  modal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);
