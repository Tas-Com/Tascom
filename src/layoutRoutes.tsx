import { createRoute, createRootRoute, Navigate, Outlet } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <Navigate to="/" />,
});

export const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main-layout',
  component: () => (
    <div className="min-h-screen bg-background font-sans antialiased">
      <h1>Header</h1>
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  ),
});
