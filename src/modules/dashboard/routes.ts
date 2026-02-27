import { createRoute } from '@tanstack/react-router';
import { DashboardPage } from './views';
import { profileRoute } from '../profile/routes';


export const dashboardRoute = createRoute({
    getParentRoute: () => profileRoute,
    path: '/dashboard',
    component: DashboardPage,
});

export const dashboardRoutes = [dashboardRoute];
