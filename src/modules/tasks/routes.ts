import { createRoute } from '@tanstack/react-router';
import { mainLayoutRoute } from '../../layoutRoutes';
import { TasksListPage } from './views/TasksListPage';
import { TaskDetailsPage } from './views/TaskDetailsPage';

export const tasksRoute = createRoute({
    getParentRoute: () => mainLayoutRoute,
    path: '/tasks',
    component: TasksListPage,
});

export const taskDetailsRoute = createRoute({
    getParentRoute: () => mainLayoutRoute,
    path: '/tasks/$taskId',
    component: TaskDetailsPage,
});

export const tasksRoutes = [tasksRoute, taskDetailsRoute];
