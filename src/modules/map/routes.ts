import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { MapPage } from "./views/MapPage";

export const mapRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/map",
  component: MapPage,
});

export const mapRoutes = [mapRoute];
