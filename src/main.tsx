import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./contexts/app-context";
import { ModalProvider } from "./contexts/modal-provider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</AppProvider>
	</StrictMode>
);
