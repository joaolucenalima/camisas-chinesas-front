import {
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { Modal } from '../components/modal';
import { ModalContext } from './modal-context';

export type ModalType = {
  modalElement: ReactNode;
  title: string;
} | null;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setModal(modal);
  const closeModal = () => setModal(null);

  useEffect(() => {
    if (!modal) return undefined;

    const modalElement = document.getElementById(
      'modal_overlay'
    ) as HTMLElement;
    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'input, button, select, [tabindex]'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (focusableElements.length === 0) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleTabKeyPress);

    return () => {
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [modal]);

  const contextValue = useMemo(
    () => ({ modal, openModal, closeModal }),
    [modal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}