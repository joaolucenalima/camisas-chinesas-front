import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Modal } from "@/shared/ui/modal";
import { ModalContext, type ModalState } from "./modal-context";

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalState>(null);

  const openModal = (nextModal: ModalState) => setModal(nextModal);
  const closeModal = () => setModal(null);

  useEffect(() => {
    if (!modal) {
      return undefined;
    }

    const modalElement = document.getElementById("modal-overlay") as HTMLElement | null;
    const focusableElements = modalElement?.querySelectorAll<HTMLElement>(
      "input, button, select, [tabindex]",
    );

    if (!focusableElements || focusableElements.length === 0) {
      return undefined;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleTabKeyPress);

    return () => {
      document.removeEventListener("keydown", handleTabKeyPress);
    };
  }, [modal]);

  const contextValue = useMemo(() => ({ modal, openModal, closeModal }), [modal]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}
