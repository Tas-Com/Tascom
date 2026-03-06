import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";

export const notificationsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/notifications",
  component: lazyRouteComponent(() => import("./views"), "NotificationsPage"),
});

export const notificationsRoutes = [notificationsRoute];
