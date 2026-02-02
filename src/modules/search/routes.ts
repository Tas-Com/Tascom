import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes";
import { MapPage } from "./views/map";
import { SearchPage } from "./views/searchResults";

export const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  component: MapPage,
});

export const searchPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

export const searchRoutes = [mapRoute, searchPageRoute];
