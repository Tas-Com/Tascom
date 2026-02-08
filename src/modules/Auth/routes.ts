import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../layoutRoutes";
import LoginPage from "./view/Login";
import RegisterPage from "./view/Resgister";
import ForgotPasswordPage from "./view/ForgotPassword";
import TermsPrivacyPage from "./view/TermsPrivacy";
import AuthLayout from "./view/AuthLayout";

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

export const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: LoginPage,
});

export const registerRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/register",
  component: RegisterPage,
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

export const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPrivacyPage,
});

export const authRoutes = [
  authLayoutRoute.addChildren([loginRoute, registerRoute, forgotPasswordRoute]),
  termsRoute,
];
