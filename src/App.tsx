import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes";

export const router = createRouter({ routeTree, notFoundMode: 'root' });

declare module '@tanstack/react-router' {
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