import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { ProfileLayout } from "./views/ProfileLayout";
import ProfilePage from "./views/ProfilePage";
import SavedTasksPage from "./views/SavedTasksPage";

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

export const profileRoutes = [profileRoute, myProfileRoute, savedTasksRoute];
