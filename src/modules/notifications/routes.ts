import { createRoute } from '@tanstack/react-router';
import { mainLayoutRoute } from '../../layoutRoutes';
import { NotificationsPage } from './views';

export const notificationsRoute = createRoute({
    getParentRoute: () => mainLayoutRoute,
    path: '/notifications',
    component: NotificationsPage,
});

export const notificationsRoutes = [notificationsRoute];
