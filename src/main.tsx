import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./contexts/app-provider";
import { ModalProvider } from "./contexts/modal-provider";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </AppProvider>
);
