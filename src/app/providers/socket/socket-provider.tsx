import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SocketContext } from "./socket-context";

type SocketProviderProps = {
  children: ReactNode;
};

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://${import.meta.env.VITE_API_URL.split("://")[1]}`;
    const ws = new WebSocket(wsUrl);

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  const contextValue = useMemo(() => ({ socket }), [socket]);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
}
