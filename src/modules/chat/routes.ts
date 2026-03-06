import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";

export const chatRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/chat",
  component: lazyRouteComponent(() => import("./views")),
});

export const chatRoutes = [chatRoute];
