import { createContext } from "react";

export type SocketContextValue = {
  socket: WebSocket | null;
};

export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined,
);
