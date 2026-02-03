import { createRoute } from '@tanstack/react-router';
import { mainLayoutRoute } from '../../layoutRoutes';
import { DashboardPage } from './views';


export const dashboardRoute = createRoute({
    getParentRoute: () => mainLayoutRoute,
    path: '/dashboard',
    component: DashboardPage,
});

export const dashboardRoutes = [dashboardRoute];
