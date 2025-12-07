import {
	createContext
} from "react";

export type AppContextType = {
	dollarRate: number | null;
	refresh: () => Promise<void>,
	socket: WebSocket | null
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
