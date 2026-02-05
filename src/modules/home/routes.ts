import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../routes';
import { HomePage } from './views';

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

export const homeRoutes = [homeRoute];


