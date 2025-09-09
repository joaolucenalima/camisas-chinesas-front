import { useState } from "react";
import { Shirt } from "./shirt";
import { Plus } from "lucide-react";
import { useModal } from "../contexts/useModal";
import { AddShirtForm } from "./add-shirt-form";

interface PersonSectionProps {
	personName: string;
	shirts: string[];
}

export function PersonSection({ personName, shirts }: PersonSectionProps) {
	const { openModal } = useModal()

	const [isHover, setIsHover] = useState<boolean>(false);

	return (
		<section
			className="w-full border-2 border-zinc-200 rounded-lg p-5 relative"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<h2 className="text-lg font-semibold absolute -top-4 left-8 bg-white px-2">
				{personName}
			</h2>

			{isHover && (
				<button
					className="absolute -top-2.5 right-4 w-6 h-6 bg-white border border-zinc-400 rounded flex items-center justify-center cursor-pointer hover:bg-zinc-100"
					title="Adicionar camisa"
					onClick={() => openModal({
						title: "Adicionar camisa",
						modalElement: <AddShirtForm personName={personName} />
					})}
				>
					<Plus size={18} />
				</button>
			)}

			<div className="flex flex-wrap gap-4">
				{shirts.length ? (
					shirts.map((shirt) => <Shirt key={shirt} image={shirt} />)
				) : (
					<p className="flex-1 text-center p-2">Nenhuma camisa escolhida</p>
				)}
			</div>
		</section>
	);
}
