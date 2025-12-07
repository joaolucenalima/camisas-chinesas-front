import { useContext } from "react";
import { type AppContextType, AppContext } from "../contexts/app-context";

export function useAppContext(): AppContextType {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
	return ctx;
}