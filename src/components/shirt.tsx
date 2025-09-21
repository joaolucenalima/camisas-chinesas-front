import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useModal } from "../contexts/useModal";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { AddShirtForm } from "./add-shirt-form";

export function Shirt({ shirt, refetch }: { shirt: ShirtDTO, refetch: () => void }) {
	const { openModal } = useModal();

	const [showActionButtons, setShowActionButtons] = useState(false);

	return (
		<div
			className="border border-zinc-400 rounded shadow-lg relative"
			onMouseEnter={() => setShowActionButtons(true)}
			onMouseLeave={() => setShowActionButtons(false)}
		>
			<div className="w-52 h-48 bg-gray-100 rounded-t overflow-hidden">
				<img
					src={`http://localhost:3333/download/${shirt.imageURL}`}
					alt={shirt.title}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="text-sm p-2 truncate">
				<p>{shirt.title}</p>
			</div>

			{showActionButtons && (
				<div className="absolute -top-2 right-0 flex items-center gap-1">
					<button
						type="button"
						aria-label="Edit shirt"
						className="flex items-center justify-center w-6 h-6 text-sm bg-white rounded-full border border-zinc-700 hover:bg-zinc-50 cursor-pointer"
						title="Editar camisa"
						onClick={() => openModal({
							modalElement: <AddShirtForm personId={shirt.personId} refetch={refetch} />,
							title: "Editar camisa"
						})}
					>
						<Pencil size={16} />
					</button>

					<button
						type="button"
						aria-label="Mark to buy"
						className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer"
						title="Marcar para compra"
					>
						<Check size={16} />
					</button>

					<button
						type="button"
						aria-label="Mark no interest"
						className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
						title="Marcar não interesse"
					>
						<X size={16} />
					</button>
				</div>
			)}
		</div>
	);
}
