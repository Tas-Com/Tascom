import { createRoute } from '@tanstack/react-router';
import { adminLayoutRoute } from '../../layoutRoutes';
import { DashboardPage } from './Dashboard';
import { UsersPage } from './Users';
import { RolesPage } from './Roles';
import { AdminSettingsPage } from './Settings';
import { TasksModerationPage } from './TasksModeration';

export const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
});

export const adminTasksRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/tasks',
  component: TasksModerationPage,
});

export const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/users',
  component: UsersPage,
});

export const adminRolesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/roles',
  component: RolesPage,
});

export const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/settings',
  component: AdminSettingsPage,
});

export const adminRootRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: DashboardPage,
});

export const adminRoutes = [
  adminRootRoute,
  adminDashboardRoute,
  adminTasksRoute,
  adminUsersRoute,
  adminRolesRoute,
  adminSettingsRoute,
];
