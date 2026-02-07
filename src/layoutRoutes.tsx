import {
  createRoute,
  createRootRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { MainLayout } from "@/shared/components/layout/MainLayout";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <Navigate to="/" />,
});

export const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: MainLayout,
});
