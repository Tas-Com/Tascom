import { useQuery } from "@tanstack/react-query";
import { restDashboard } from "../repository/restDashboard";

const dashboardRepo = restDashboard();

export function useDashboardKpis(range?: 'today' | 'last_week' | 'last_month') {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'kpis', range],
    queryFn: () => dashboardRepo.getKpis(range),
  });
}

export function useTaskCompletionSeries(range?: 'today' | 'last_week' | 'last_month') {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'completion-series', range],
    queryFn: () => dashboardRepo.getTaskCompletionSeries(range),
  });
}

export function usePointsMetrics(range?: 'today' | 'last_week' | 'last_month') {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'points-metrics', range],
    queryFn: () => dashboardRepo.getPointsMetrics(range),
  });
}

export function useRecentReports(range?: 'today' | 'last_week' | 'last_month', page?: number, limit?: number) {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'recent-reports', range, page, limit],
    queryFn: () => dashboardRepo.getRecentReports(range, page, limit),
  });
}

export function useNewPublishedTasks(limit?: number) {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'new-tasks', limit],
    queryFn: () => dashboardRepo.getNewPublishedTasks(limit),
  });
}
