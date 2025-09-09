import { useEffect, useState } from "react";
import { PersonSection } from "./components/person-section";

type ShirtType = {
	camisetas: {
		primeira_leva: string[];
		segunda_leva: {
			[key: string]: string[];
		};
	};
};

function App() {
	const [shirts, setShirts] = useState<ShirtType>();

	useEffect(() => {
		fetch("http://localhost:3333/files")
			.then((response) => response.json())
			.then((data) => setShirts(data));
	}, []);

	return (
		<>
			<h1 className="text-3xl font-semibold">Camisas chinesas</h1>

			<p>Aplicação para colocar seus pedidos de camisas de time da china</p>

			<main className="w-full flex flex-col gap-4 mt-2">
				{shirts &&
					Object.entries(shirts?.camisetas.segunda_leva).map(
						([person, shirts]) => (
							<PersonSection
								key={person}
								personName={person}
								shirts={shirts}
							/>
						)
					)}
			</main>
		</>
	);
}

export default App;
