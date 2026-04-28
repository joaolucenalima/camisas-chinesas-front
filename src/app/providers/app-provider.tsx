import type { ReactNode } from "react";
import { ModalProvider } from "./modal/modal-provider";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth/auth-provider";
import { SocketProvider } from "./socket/socket-provider";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <QueryProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </QueryProvider>
    </SocketProvider>
  );
}
