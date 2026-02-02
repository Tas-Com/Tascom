import { createRootRoute, createRoute, Navigate, Outlet } from '@tanstack/react-router';
import { Button } from './components/ui/button';
import LoginPage from './modules/Auth/view/Login';
import RegisterPage from './modules/Auth/view/Resgister';

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <Navigate to="/" />,
});
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <div className="flex flex-col items-center justify-center">
        <Button className="border-2">Click me</Button>
      </div>

      <h1>Heading 1</h1>
      <p className="text-body1">Body text</p>
      <Button className="text-btn-primary border-2">Button</Button>

      <br />

      <div className="bg-bg-primary text-text-primary border-border-default">
        <span className="text-brand-purple">Brand text</span>
        <div className="bg-priority-high-bg text-priority-high-text">High Priority</div>
      </div>
    </>
  ),
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});
export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});
export const routeTree = rootRoute.addChildren([homeRoute, loginRoute, registerRoute]);
