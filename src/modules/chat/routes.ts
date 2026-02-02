import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes";
import Chat from "./views";

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: Chat,
});

export const chatRoutes = [chatRoute];
