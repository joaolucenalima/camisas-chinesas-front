import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ModalProvider } from "@/shared/lib/modal/modal-provider";
import { AppSocketContext } from "@/app/providers/socket/app-socket-context";
import { QueryProvider } from "@/app/providers/query-provider";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
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

  return (
    <AppSocketContext.Provider value={contextValue}>
      <QueryProvider>
        <ModalProvider>{children}</ModalProvider>
      </QueryProvider>
    </AppSocketContext.Provider>
  );
}
