import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { mainLayoutRoute } from "../../layoutRoutes";
import { z } from "zod";

const userProfileSearchSchema = z.object({
  showAcceptButton: z.boolean().optional().catch(false),
});

export const userProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/user-profile/$userId",
  component: lazyRouteComponent(() => import("./views/UserProfilePage")),
  validateSearch: (search) => userProfileSearchSchema.parse(search),
});

export const userProfileRoutes = [userProfileRoute];
