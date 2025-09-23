import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useModal } from "../contexts/useModal";
import type { PersonDTO } from "../dtos/personDTO";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { useFetch } from "../hooks/use-fetch";
import { ShirtForm } from "./shirt-form";
import { Shirt } from "./shirt";
import { useAppContext } from "../contexts/app-context";

export function PersonSection({ person }: { person: PersonDTO }) {
	const { openModal } = useModal();
	const { dollarRate } = useAppContext();

	const [isHover, setIsHover] = useState<boolean>(false);

	const { data: shirts, refetch } = useFetch<ShirtDTO[]>(
		`/shirt/by-person/${person.id}`
	);

	const shirtsAmount = useMemo(() => {
		const amount = shirts
			?.filter((shirt) => shirt.status === 3)
			.reduce((amount, shirt) => {
				return (amount += shirt.priceInCents);
			}, 0);

		if (amount) {
			return {
				amountInDollar: (amount / 100).toLocaleString("en-US", {
					currency: "USD",
					style: "currency",
				}),
				amountInReal: ((amount / 100) * (dollarRate || 1)).toLocaleString(
					"pt-BR",
					{
						currency: "BRL",
						style: "currency",
					}
				),
			};
		}

		return null;
	}, [shirts, dollarRate]);

	return (
		<section
			className="w-full border-2 border-zinc-200 rounded-lg p-5 relative"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<h2 className="text-lg font-semibold absolute -top-4 left-8 bg-white px-2">
				{person.name}{" "}
				{shirtsAmount ? (
					<span className="font-normal">
						- {shirtsAmount.amountInDollar} - {shirtsAmount.amountInReal}
					</span>
				) : (
					""
				)}
			</h2>

			{isHover && (
				<button
					className="absolute -top-2.5 right-4 w-6 h-6 bg-white border border-zinc-400 text-zinc-600 rounded flex items-center justify-center cursor-pointer hover:bg-zinc-100"
					title="Adicionar camisa"
					onClick={() =>
						openModal({
							title: "Adicionar camisa",
							modalElement: (
								<ShirtForm personId={person.id} refetch={refetch} />
							),
						})
					}
				>
					<Plus size={18} />
				</button>
			)}

			<div className="flex flex-wrap gap-4">
				{shirts?.length ? (
					shirts.map((shirt) => (
						<Shirt key={shirt.id} shirt={shirt} refetch={refetch} />
					))
				) : (
					<p className="flex-1 text-center p-2">Nenhuma camisa escolhida</p>
				)}
			</div>
		</section>
	);
}
