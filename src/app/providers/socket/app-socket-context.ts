import { createContext } from "react";

export type AppSocketContextValue = {
  socket: WebSocket | null;
};

export const AppSocketContext = createContext<AppSocketContextValue | undefined>(
  undefined,
);
