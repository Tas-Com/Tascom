import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full min-h-50">
    <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({
  routeTree,
  notFoundMode: "root",
  defaultPendingComponent: LoadingSpinner,
  defaultPendingMinMs: 200,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
import { useLocation } from "./shared/hooks/useLocation";

function App() {
  useLocation();
  return <RouterProvider router={router} />;
}

export default App;
