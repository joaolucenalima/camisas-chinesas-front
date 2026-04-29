import { createRoot } from "react-dom/client";
import { AppProvider } from "@/app/providers/app-provider";
import RootApp from "@/app/root-app.tsx";
import "@/style.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <Toaster
      position="top-right"
      richColors={true}
      mobileOffset={8}
      style={{
        fontSize: "14px",
        letterSpacing: "0",
      }}
      closeButton
    />

    <RootApp />
  </AppProvider>,
);
