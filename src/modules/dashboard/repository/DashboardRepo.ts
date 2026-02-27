import type { MyClaimsResponse, MyTasksResponse } from "./DashboardDtos";

export interface DashboardRepo {
    getMyTasks: () => Promise<MyTasksResponse>;
    getMyClaims: () => Promise<MyClaimsResponse>;
}
