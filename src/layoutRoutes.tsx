import {
  createRoute,
  createRootRoute,
  Navigate,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { MainLayout } from "@/shared/components/layout/MainLayout";
import { tokenManager } from "./shared/api/client";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <Navigate to="/" />,
});

export const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: MainLayout,
  // beforeLoad: () => {
  //   if (!tokenManager.isAuthenticated()) {
  //     throw redirect({
  //       to: "/login",
  //     });
  //   }
  // },
});
