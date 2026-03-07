import { homeRoutes } from "./modules/home";
import { tasksRoutes } from "./modules/tasks/routes";
import {
  profileRoute,
  myProfileRoute,
  savedTasksRoute,
  dashboardRoute,
  pointsRoute,
  requestsRoute,
} from "./modules/profile/routes";
import { notificationsRoutes } from "./modules/notifications";
import { chatRoutes } from "./modules/chat/routes";
import {
  settingsRoute,
  languageSettingsRoute,
  notificationSettingsRoute,
  passwordSettingsRoute,
  deleteAccountRoute,
  reportsRoute,
} from "./modules/settings/routes";
import { authRoutes } from "./modules/Auth/routes";
import { adminRoutes } from "./modules/Admin";
import { rootRoute, mainLayoutRoute, adminLayoutRoute } from "./layoutRoutes";
import { topResultsRoutes } from "./modules/results";
import { mapRoutes } from "./modules/map";
import { userProfileRoutes } from "./modules/userProfile";

export const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([
    ...homeRoutes,
    ...tasksRoutes,
    topResultsRoutes,
    profileRoute.addChildren([
      myProfileRoute,
      savedTasksRoute,
      dashboardRoute,
      pointsRoute,
      requestsRoute,
      settingsRoute.addChildren([
        languageSettingsRoute,
        notificationSettingsRoute,
        passwordSettingsRoute,
        deleteAccountRoute,
        reportsRoute,
      ]),
    ]),
    ...notificationsRoutes,
    ...chatRoutes,
    ...mapRoutes,
    ...userProfileRoutes,
  ]),
  adminLayoutRoute.addChildren([
    ...adminRoutes,
  ]),
  ...authRoutes,
]);

export { rootRoute, mainLayoutRoute };
