import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { MapPage } from "./views/map";
import { SearchPage } from "./views/searchResults";

export const mapRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/map",
  component: MapPage,
});

export const searchPageRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/search",
  component: SearchPage,
});

export const searchRoutes = [mapRoute, searchPageRoute];
