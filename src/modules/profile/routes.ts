import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { ProfileLayout } from "./views/ProfileLayout";

export const profileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/profile",
  component: ProfileLayout,
});

export const myProfileRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./views/ProfilePage")),
});

export const savedTasksRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/saved",
  component: lazyRouteComponent(() => import("./views/SavedTasksPage")),
});

export const dashboardRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/dashboard",
  component: lazyRouteComponent(
    () => import("../dashboard/views"),
    "DashboardPage",
  ),
});

export const pointsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/points",
  component: lazyRouteComponent(() => import("./views/PointsBalancePage")),
});

export const requestsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/requests",
  component: lazyRouteComponent(() => import("./views/RequestsPage")),
});

export const profileRoutes = [
  profileRoute,
  myProfileRoute,
  savedTasksRoute,
  dashboardRoute,
  pointsRoute,
  requestsRoute,
];
