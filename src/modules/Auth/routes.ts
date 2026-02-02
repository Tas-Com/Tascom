import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes";
import LoginPage from "./view/Login";
import RegisterPage from "./view/Resgister";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

export const authRoutes = [loginRoute, registerRoute];
