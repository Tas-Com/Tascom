import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "@/layoutRoutes";

export const topResultsRoutes = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/results",
  component: lazyRouteComponent(() => import("./views"), "TopResultsPage"),
});
