import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes";
import { mainLayoutRoute } from "../../routes";
import { ProfileLayout } from "./views/ProfileLayout";
import ProfilePage from "./views/ProfilePage";

export const profileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute, 
  path: "profile", 
  component: ProfileLayout,
});


export const myProfileRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "/",
  component: ProfilePage,
});


export const profileRoutes = [profileRoute];
