import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAuthModule } from "./modules/Auth/index.tsx";
import { SearchProvider } from "./shared/contexts/SearchContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
const { Provider: AuthProvider } = createAuthModule();

// For HMR issue, remove when deploy
const container = document.getElementById("root")!;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const root = (container as any)._reactRoot ?? createRoot(container);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(container as any)._reactRoot = root;

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
