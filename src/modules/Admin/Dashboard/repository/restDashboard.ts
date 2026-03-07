import { apiClient } from "@/shared/api/client";
import type { DashboardRepo } from "./DashboardRepo";
import type { ApiResponse } from "@/shared/api/types";
import type { 
  KpiResponse, 
  TaskCompletionData, 
  PointsMetrics, 
  RecentReport, 
  NewPublishedTask 
} from "./DashboardDtos";

export const restDashboard = (): DashboardRepo => ({
  getKpis: async (range) => {
    const res = await apiClient.get<ApiResponse<KpiResponse>>("/admin/dashboard/kpis", { params: { range } });
    return res.data;
  },
  getTaskCompletionSeries: async (range) => {
    const res = await apiClient.get<ApiResponse<TaskCompletionData[]>>("/admin/dashboard/task-completion-series", { params: { range, interval: 'day' } });
    return res.data;
  },
  getPointsMetrics: async (range) => {
    const res = await apiClient.get<ApiResponse<PointsMetrics>>("/admin/dashboard/points-metrics", { params: { range } });
    return res.data;
  },
  getRecentReports: async (range, page = 1, limit = 10) => {
    const res = await apiClient.get<ApiResponse<{ data: RecentReport[], total: number }>>("/admin/dashboard/recent-reports", { params: { range, page, limit } });
    return res.data;
  },
  getNewPublishedTasks: async (limit = 5) => {
    const res = await apiClient.get<ApiResponse<NewPublishedTask[]>>("/admin/dashboard/new-published-tasks", { params: { limit } });
    return res.data;
  },
});
