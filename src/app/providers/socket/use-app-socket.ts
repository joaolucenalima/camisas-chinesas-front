import { useContext } from "react";
import { AppSocketContext, type AppSocketContextValue } from "@/app/providers/socket/app-socket-context";

export function useAppSocket(): AppSocketContextValue {
  const context = useContext(AppSocketContext);

  if (!context) {
    throw new Error("useAppSocket must be used within AppProvider");
  }

  return context;
}
