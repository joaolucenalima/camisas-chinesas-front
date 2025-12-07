import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./app-context";

type AppProviderProps = {
	children: React.ReactNode;
	targetCurrency?: string;
};

export const AppProvider: React.FC<AppProviderProps> = ({
	children,
	targetCurrency = "BRL",
}) => {
	const [dollarRate, setDollarRate] = useState<number | null>(null);

	const fetchRate = useCallback(async () => {
		setDollarRate(5.31)
		return 
		
		const url = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_KEY}/latest/USD`;

		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();
		const rate = data.conversion_rates[targetCurrency];

		if (typeof rate !== "number")
			throw new Error("Invalid response: missing rate");

		setDollarRate(rate);
	}, [targetCurrency]);

	const refresh = useCallback(async () => {
		await fetchRate();
	}, [fetchRate]);

	useEffect(() => {
		fetchRate();
	}, [fetchRate]);

	return (
		<AppContext.Provider value={{ dollarRate, refresh }}>
			{children}
		</AppContext.Provider>
	);
};