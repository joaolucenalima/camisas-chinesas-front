import { createContext } from "react";

export type AppContextType = {
  socket: WebSocket | null;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
