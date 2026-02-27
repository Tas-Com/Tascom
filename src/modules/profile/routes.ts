import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { ProfileLayout } from "./views/ProfileLayout";
import ProfilePage from "./views/ProfilePage";
import SavedTasksPage from "./views/SavedTasksPage";
import PointsBalancePage from "./views/PointsBalancePage";
import RequestsPage from "./views/RequestsPage";
import { DashboardPage } from "../dashboard/views";

export const profileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/profile",
  component: ProfileLayout,
});

export const myProfileRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/",
  component: ProfilePage,
});

export const savedTasksRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/saved",
  component: SavedTasksPage,
});

export const dashboardRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/dashboard",
  component: DashboardPage,
});

export const pointsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/points",
  component: PointsBalancePage,
});

export const requestsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/requests",
  component: RequestsPage,
});

export const profileRoutes = [
  profileRoute,
  myProfileRoute,
  savedTasksRoute,
  dashboardRoute,
  pointsRoute,
  requestsRoute,
];
