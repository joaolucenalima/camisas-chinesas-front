import { useEffect, useRef } from "react";
import { AppContext } from "./app-context";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const socketRef = useRef<WebSocket>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(
      `ws://${import.meta.env.VITE_API_URL.split("://")[1]}`,
    );
    return () => socketRef.current?.close();
  }, []);

  return (
    <AppContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </AppContext.Provider>
  );
};
