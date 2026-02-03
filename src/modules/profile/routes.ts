import { createRoute } from '@tanstack/react-router';
import { mainLayoutRoute } from '../../layoutRoutes';
import ProfilePage from './views';

export const profileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/profile',
  component: ProfilePage,
});

export const profileRoutes = [profileRoute];
