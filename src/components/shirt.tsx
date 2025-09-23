import { Check, Ellipsis, Pencil, SendToBack, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useModal } from "../contexts/useModal";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { ShirtForm } from "./shirt-form";

const SHIRT_STATUS = {
	1: {
		text: "Decidindo",
		color: "bg-zinc-200",
	},
	2: {
		text: "Aguardando resposta",
		color: "bg-yellow-300",
	},
	3: {
		text: "Para compra",
		color: "bg-green-300",
	},
	4: { text: "Sem interesse", color: "bg-red-300" },
};

export function Shirt({
	shirt,
	refetch,
}: {
	shirt: ShirtDTO;
	refetch: () => void;
}) {
	const { openModal, confirm } = useModal();

	const [showActionButtons, setShowActionButtons] = useState(false);

	function handleChangeShirtStatus(status: number, shirtId: number) {
		fetch(`${import.meta.env.VITE_API_URL}/shirt/${shirtId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status }),
		}).then(() => {
			refetch();
		});
	}

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

				{SHIRT_STATUS[shirt.status] ? (
					<div
						className={`w-max px-2 py-1 rounded col-span-2 ${
							SHIRT_STATUS[shirt.status].color
						}`}
					>
						{SHIRT_STATUS[shirt.status].text}
					</div>
				) : (
					""
				)}
			</div>

			{showActionButtons && (
				<div className="absolute -top-2 right-0 left-0 flex items-center justify-between">
					<button
						type="button"
						aria-label="Apagar camisa"
						className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-red-700 text-white rounded-full hover:bg-red-800 cursor-pointer"
						title="Apagar camisa"
						onClick={() =>
							confirm({
								message: (
									<p>
										Tem certeza que deseja apagar a camisa{" "}
										<strong>{shirt.title}</strong>?
									</p>
								),
								onConfirm: () => {
									fetch(`${import.meta.env.VITE_API_URL}/shirt/${shirt.id}`, {
										method: "DELETE",
									}).then(() => {
										refetch();
									});
								},
								title: "Apagar camisa",
							})
						}
					>
						<Trash2 size={14} />
					</button>

					<div className="flex gap-1">
						<button
							type="button"
							aria-label="Editar camisa"
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
							aria-label="Marcar para decidir"
							className="flex items-center justify-center w-6 h-6 py-1 text-sm border border-zinc-600 bg-zinc-100 rounded-full hover:bg-zinc-200 cursor-pointer"
							title="Marcar para decidir"
							onClick={() => handleChangeShirtStatus(1, shirt.id)}
						>
							<SendToBack size={16} />
						</button>

						<button
							type="button"
							aria-label="Marcar como pendente"
							className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-yellow-600 text-white rounded-full hover:bg-yellow-700 cursor-pointer"
							title="Marcar como pendente"
							onClick={() => handleChangeShirtStatus(2, shirt.id)}
						>
							<Ellipsis size={16} />
						</button>

						<button
							type="button"
							aria-label="Marcar para compra"
							className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer"
							title="Marcar para compra"
							onClick={() => handleChangeShirtStatus(3, shirt.id)}
						>
							<Check size={16} />
						</button>

						<button
							type="button"
							aria-label="Marcar não interesse"
							className="flex items-center justify-center w-6 h-6 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
							title="Marcar não interesse"
							onClick={() => handleChangeShirtStatus(4, shirt.id)}
						>
							<X size={16} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
