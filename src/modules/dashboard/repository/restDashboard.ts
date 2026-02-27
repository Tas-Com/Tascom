import { apiClient } from "@/shared/api/client";
import type { DashboardRepo } from "./DashboardRepo";
import type { MyClaimsResponse, MyTasksResponse } from "./DashboardDtos";

export const restDashboard = (): DashboardRepo => ({
    getMyTasks: async () => {
        return await apiClient.get<MyTasksResponse>("/task-claims/my-tasks");
    },
    getMyClaims: async () => {
        return await apiClient.get<MyClaimsResponse>("/task-claims/me");
    },
});
