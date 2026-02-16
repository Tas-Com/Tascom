import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "@/layoutRoutes";
import { TopResultsPage } from "./views";

export const topResultsRoutes = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/results",
  component: TopResultsPage,
});
