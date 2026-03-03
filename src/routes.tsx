import { homeRoutes } from "./modules/home";
import { tasksRoutes } from "./modules/tasks/routes";
import { profileRoutes } from "./modules/profile";
import { notificationsRoutes } from "./modules/notifications";
import { chatRoutes } from "./modules/chat/routes";
import { settingsRoutes } from "./modules/settings";
import { authRoutes } from "./modules/Auth/routes";
import { rootRoute, mainLayoutRoute } from "./layoutRoutes";
import { topResultsRoutes } from "./modules/results";
import { mapRoutes } from "./modules/map";
import { userProfileRoutes } from "./modules/userProfile";

export const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([
    ...homeRoutes,
    ...tasksRoutes,
    topResultsRoutes,
    ...profileRoutes,
    ...notificationsRoutes,
    ...chatRoutes,
    ...settingsRoutes,
    ...mapRoutes,
    ...userProfileRoutes,
  ]),
  ...authRoutes,
]);

export { rootRoute, mainLayoutRoute };
