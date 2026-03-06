import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";
import { rootRoute } from "../../layoutRoutes";
import { tokenManager } from "../../shared/api/client";

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: lazyRouteComponent(() => import("./view/AuthLayout")),
  beforeLoad: () => {
    if (tokenManager.isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

export const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: lazyRouteComponent(() => import("./view/Login")),
});

export const registerRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/register",
  component: lazyRouteComponent(() => import("./view/Resgister")),
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/forgot-password",
  component: lazyRouteComponent(() => import("./view/ForgotPassword")),
});

export const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: lazyRouteComponent(() => import("./view/TermsPrivacy")),
});

export const authRoutes = [
  authLayoutRoute.addChildren([
    loginRoute,
    registerRoute,
    forgotPasswordRoute,
    termsRoute,
  ]),
];
