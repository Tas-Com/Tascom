import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../routes';
import { NotificationsPage } from './views';

export const notificationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/notifications',
    component: NotificationsPage,
});

export const notificationsRoutes = [notificationsRoute];
