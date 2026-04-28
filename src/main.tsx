import { createRoot } from "react-dom/client";
import { AppProvider } from "@/app/providers/app-provider";
import RootApp from "@/app/root-app.tsx";
import "@/style.css";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <RootApp />
  </AppProvider>
);
