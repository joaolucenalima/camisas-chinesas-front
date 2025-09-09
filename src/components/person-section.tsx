import { Shirt } from "./shirt";

interface PersonSectionProps {
	personName: string;
	shirts: string[];
}

export function PersonSection({
	personName,
	shirts,
}: PersonSectionProps) {
	return (
		<section className="w-full border-2 border-zinc-200 rounded-lg p-5 relative">
			<h2 className="text-lg font-semibold absolute top-[-1rem] left-8 bg-white px-2">{personName}</h2>

			<div className="flex flex-wrap gap-4">
				{shirts.length ?
					shirts.map((shirt) => (
						<Shirt key={shirt} image={shirt} />
					))
				: <p className="flex-1 text-center p-2">Nenhuma camisa escolhida</p>
				}
			</div>
		</section>
	);
}
