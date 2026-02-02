import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../routes';
import { TasksListPage } from './views/TasksListPage';
import { TaskDetailsPage } from './views/TaskDetailsPage';

export const tasksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/tasks',
    component: TasksListPage,
});

export const taskDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/tasks/$taskId',
    component: TaskDetailsPage,
});

export const tasksRoutes = [tasksRoute, taskDetailsRoute];
