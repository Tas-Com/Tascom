import { createRoute } from '@tanstack/react-router';
import { mainLayoutRoute } from '../../layoutRoutes';
import { SettingsPage } from './views';

export const settingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/settings',
  component: SettingsPage,
});

export const settingsRoutes = [settingsRoute];
