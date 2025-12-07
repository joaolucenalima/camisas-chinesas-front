import { useContext } from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "../components/confirm-dialog";
import { ModalContext } from "./modal-context";

export const useModal = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}

	const { openModal, closeModal, modal } = context;

	const confirm = ({
		title,
		message,
		onConfirm,
		onCancel,
	}: ConfirmDialogProps & { title: string }) => {
		openModal({
			title,
			modalElement: (
				<ConfirmDialog
					message={message}
					onConfirm={onConfirm}
					onCancel={onCancel}
				/>
			),
		});
	};

	return { modal, openModal, closeModal, confirm };
};
