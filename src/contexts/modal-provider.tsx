import { createContext } from "react";
import type { ModalType } from "./modal-context";

interface ModalContextType {
	modal: ModalType;
	openModal: (modal: ModalType) => void;
	closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);