import { createRoot } from "react-dom/client";
import { Toaster } from "@/shared/ui/sonner";
import { AppProvider } from "@/app/providers/app-provider";
import RootApp from "@/app/root-app.tsx";
import "@/style.css";

createRoot(document.getElementById("root")!).render(
  <>
    <AppProvider>
      <RootApp />
    </AppProvider>

    <Toaster
      position="top-center"
      richColors={true}
      mobileOffset={8}
      style={{
        fontSize: "14px",
        letterSpacing: "0",
        pointerEvents: "auto",
      }}
    />
  </>,
);
