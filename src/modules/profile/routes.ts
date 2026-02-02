import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes";
import ProfilePage from "./views";

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

export const profileRoutes = [profileRoute];
