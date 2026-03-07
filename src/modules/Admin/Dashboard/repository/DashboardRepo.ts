import type { 
  KpiResponse, 
  TaskCompletionData, 
  PointsMetrics, 
  RecentReport, 
  NewPublishedTask 
} from "./DashboardDtos";

export interface DashboardRepo {
  getKpis(range?: 'today' | 'last_week' | 'last_month'): Promise<KpiResponse>;
  getTaskCompletionSeries(range?: 'today' | 'last_week' | 'last_month'): Promise<TaskCompletionData[]>;
  getPointsMetrics(range?: 'today' | 'last_week' | 'last_month'): Promise<PointsMetrics>;
  getRecentReports(range?: 'today' | 'last_week' | 'last_month', page?: number, limit?: number): Promise<{ data: RecentReport[], total: number }>;
  getNewPublishedTasks(limit?: number): Promise<NewPublishedTask[]>;
}
