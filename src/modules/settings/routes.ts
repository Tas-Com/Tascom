import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../routes';
import { SettingsPage } from './views';

export const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: SettingsPage,
});

export const settingsRoutes = [settingsRoute];
