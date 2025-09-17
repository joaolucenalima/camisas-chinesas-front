import { useState } from "react";
import { Input } from "./input";
import { useAppContext } from "../contexts/app-context";

const SHIRTS_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export function AddShirtForm({ personName }: { personName: string }) {
	const { dollarRate } = useAppContext();

	const [priceInBRL, setPriceInBRL] = useState<number>();

	function maskCurrency(event: React.FormEvent<HTMLInputElement>) {
		const cleanedValue = event.currentTarget.value.replace(/\D/g, "");
		const integerValue = parseInt(cleanedValue || "0", 10) / 100;

		if (dollarRate) {
			setPriceInBRL(integerValue * dollarRate);
		}

		event.preventDefault();

		event.currentTarget.value = integerValue.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	}

	return (
		<form className="flex flex-col gap-5">
			<Input label="Nome" />

			<div className="flex items-center gap-4">
				<Input
					label="Preço (dólares)"
					onChange={maskCurrency}
					defaultValue={"$0.00"}
					className="flex-1"
					name="price"
				/>

				<span className="text-center">
					<p>Preço em reais:</p>
					<p>
						{priceInBRL?.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						}) || "R$ 0"}
					</p>
				</span>
			</div>

			<div>
				<h2>Tamanho</h2>

				<div className="flex items-center justify-between mt-1">
					{SHIRTS_SIZES.map((size) => (
						<label
							key={size}
							htmlFor={size}
							className="cursor-pointer border border-zinc-400 w-9 h-9 flex items-center justify-center rounded hover:border-red-500 has-[input:checked]:bg-red-800 has-[input:checked]:text-white has-[input:checked]:border-red-700"
						>
							<input
								className="sr-only"
								type="radio"
								name="shirtSize"
								id={size}
								value={size}
							/>
							<p className="text-sm select-none">{size}</p>
						</label>
					))}
				</div>
			</div>

			<Input label="Link" name="link" />
		</form>
	);
}
