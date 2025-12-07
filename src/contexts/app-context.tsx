import {
	createContext
} from "react";

export type AppContextType = {
	dollarRate: number | null;
	refresh: () => Promise<void>
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
