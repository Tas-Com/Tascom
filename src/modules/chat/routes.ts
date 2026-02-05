import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import Chat from "./views";

export const chatRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/chat",
  component: Chat,
});

export const chatRoutes = [chatRoute];
