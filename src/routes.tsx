import { createRootRoute, Navigate, Outlet } from "@tanstack/react-router";
import { homeRoutes } from "./modules/home";
import { tasksRoutes } from "./modules/tasks/routes";
import { profileRoutes } from "./modules/profile";
import { dashboardRoutes } from "./modules/dashboard";
import { notificationsRoutes } from "./modules/notifications";
import { chatRoutes } from "./modules/chat/routes";
import { settingsRoutes } from "./modules/settings";
import { searchRoutes } from "./modules/search/routes";
import { authRoutes } from "./modules/Auth/routes";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background font-sans antialiased">
      <h1>Header</h1>
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  ),
  notFoundComponent: () => <Navigate to="/" />,
});

export const routeTree = rootRoute.addChildren([
  ...homeRoutes,
  ...tasksRoutes,
  ...searchRoutes,
  ...profileRoutes,
  ...dashboardRoutes,
  ...notificationsRoutes,
  ...chatRoutes,
  ...settingsRoutes,
  ...authRoutes,
]);

// Edit auth routes...
