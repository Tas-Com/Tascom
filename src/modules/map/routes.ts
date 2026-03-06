import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";

export const mapRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/map",
  component: lazyRouteComponent(() => import("./views/MapPage"), "MapPage"),
});

export const mapRoutes = [mapRoute];
