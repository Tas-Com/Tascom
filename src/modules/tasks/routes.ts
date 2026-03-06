import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { TasksListPage } from "./views/TasksListPage";

export const tasksRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/tasks",
  component: TasksListPage,
});

export const taskDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/tasks/$taskId",
  component: lazyRouteComponent(
    () => import("./views/TaskDetailsPage"),
    "TaskDetailsPage",
  ),
});

export const tasksRoutes = [tasksRoute, taskDetailsRoute];
