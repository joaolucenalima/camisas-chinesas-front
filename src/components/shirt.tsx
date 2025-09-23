import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useModal } from "../contexts/useModal";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { ShirtForm } from "./shirt-form";

export function Shirt({
	shirt,
	refetch,
}: {
	shirt: ShirtDTO;
	refetch: () => void;
}) {
	const { openModal } = useModal();

	const [showActionButtons, setShowActionButtons] = useState(false);

	return (
		<div
			className="border border-zinc-400 rounded shadow-lg relative max-w-52"
			onMouseEnter={() => setShowActionButtons(true)}
			onMouseLeave={() => setShowActionButtons(false)}
		>
			<img
				src={`http://localhost:3333/getImage/${shirt.imageURL}`}
				alt={shirt.title}
				className="w-52 h-48 bg-gray-100 object-cover"
			/>

			<div className="grid grid-cols-[1fr_auto] gap-1 p-2 text-sm">
				{shirt.link ? (
					<a
						href={shirt.link}
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer underline text-blue-700 hover:text-blue-600 w-max"
					>
						{shirt.title}
					</a>
				) : (
					<p>{shirt.title}</p>
				)}

				{shirt.priceInCents ? (
					<p className="justify-self-end">
						{(shirt.priceInCents / 100).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</p>
				) : (
					"-"
				)}

				<p>Tamanho</p>
				<span className="justify-self-end">{shirt.size}</span>
			</div>

			{showActionButtons && (
				<div className="absolute -top-2 right-0 flex items-center gap-1">
					<button
						type="button"
						aria-label="Edit shirt"
						className="flex items-center justify-center w-6 h-6 text-sm bg-white rounded-full border border-zinc-700 hover:bg-zinc-50 cursor-pointer"
						title="Editar camisa"
						onClick={() =>
							openModal({
								modalElement: (
									<ShirtForm
										id={shirt.id}
										personId={shirt.personId}
										refetch={refetch}
									/>
								),
								title: "Editar camisa",
							})
						}
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
