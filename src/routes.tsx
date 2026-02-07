import { homeRoutes } from "./modules/home";
import { tasksRoutes } from "./modules/tasks/routes";
import { profileRoutes } from "./modules/profile";
import { dashboardRoutes } from "./modules/dashboard";
import { notificationsRoutes } from "./modules/notifications";
import { chatRoutes } from "./modules/chat/routes";
import { settingsRoutes } from "./modules/settings";
import { authRoutes } from "./modules/Auth/routes";
import { rootRoute, mainLayoutRoute } from "./layoutRoutes";
import { topResultsRoutes } from "./modules/results";

export const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([
    ...homeRoutes,
    ...tasksRoutes,
    topResultsRoutes,
    ...profileRoutes,
    ...dashboardRoutes,
    ...notificationsRoutes,
    ...chatRoutes,
    ...settingsRoutes,
  ]),
  ...authRoutes,
]);

export { rootRoute, mainLayoutRoute };
