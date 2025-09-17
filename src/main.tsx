import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./contexts/modal-context.tsx";
import App from "./App.tsx";
import { AppProvider } from "./contexts/app-context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</AppProvider>
	</StrictMode>
);
