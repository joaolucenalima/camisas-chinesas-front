import { X } from "lucide-react";
import { useModal } from "../hooks/use-modal";

export function Modal() {
  const { closeModal, modal } = useModal();

  if (!modal) return null;

  return (
    <div id="modal_overlay" className="fixed inset-0 z-10 bg-black/35 backdrop-blur-[2px] animate-overlay-show">
      <div className="bg-zinc-800 fixed top-1/2 left-1/2 z-20 w-[600px] -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-lg shadow animate-content-show">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium">{modal.title}</h1>

          <button className="flex items-center justify-center cursor-pointer" onClick={closeModal}>
            <X className="text-gray-200 w-5 h-5 hover:text-gray-400 transition-colors" />
          </button>
        </div>

        {modal.modalElement}
      </div>
    </div>
  );
}