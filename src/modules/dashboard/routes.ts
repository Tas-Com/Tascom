import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../routes';
import { DashboardPage } from './views';


export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
});

export const dashboardRoutes = [dashboardRoute];
