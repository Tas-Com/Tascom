import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { profileRoute } from "../profile/routes";

export const settingsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: "settings",
});

export const languageSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "language",
  component: lazyRouteComponent(() => import("./views/LanguageSettings")),
});

export const notificationSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "notification",
  component: lazyRouteComponent(() => import("./views/NotificationSettings")),
});

export const passwordSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "password",
  component: lazyRouteComponent(() => import("./views/ChangePassword")),
});

export const deleteAccountRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "delete",
  component: lazyRouteComponent(() => import("./views/DeleteAccount")),
});

export const reportsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "reports",
  component: lazyRouteComponent(() => import("./views/Reports")),
});

export const settingsRoutes = [
  settingsRoute,
  languageSettingsRoute,
  notificationSettingsRoute,
  deleteAccountRoute,
  passwordSettingsRoute,
  reportsRoute,
];
