import { createRoute } from '@tanstack/react-router';
import { profileRoute } from '../profile/routes';

import languageSettings from './views/LanguageSettings';
import  NotificationSettings  from './views/NotificationSettings';
import  ChangePassword  from './views/ChangePassword';
import DeleteAccount from "./views/DeleteAccount"; 
import ReportsPage from "./views/Reports";

export const settingsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: 'settings',
});

export const languageSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'language',
  component: languageSettings,
});

export const notificationSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'notification',
  component: NotificationSettings,
});

export const passwordSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'password',
  component: ChangePassword,
});

export const deleteAccountRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "delete",
  component: DeleteAccount,
});

export const reportsRoute = createRoute({  
  getParentRoute: () => settingsRoute,
  path: "reports",
  component: ReportsPage,
});



export const settingsRoutes = [
  settingsRoute,
  languageSettingsRoute,
  notificationSettingsRoute,
  deleteAccountRoute,
  passwordSettingsRoute,
    reportsRoute,
];

