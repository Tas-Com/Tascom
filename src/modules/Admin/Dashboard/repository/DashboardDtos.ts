export interface KpiResponse {
  totalUsers: number;
  totalUsersChangePct: number;
  newUsersLastMonth: number;
  taskCompletionRate: number;
  taskCompletionChangePct: number;
  completedTasksLastMonth: number;
  underReviewReports: number;
  underReviewChangePct: number;
  newReportsLastMonth: number;
  activeUsersLastMonth: number;
  topCountry: string;
  topCountryActiveUsersLastMonth: number;
}

export interface TaskCompletionData {
  date: string;
  totalTasks: number;
  completedTasks: number;
}

export interface PointsMetrics {
  earnedVsSpent: number;
  activeCirculation: number;
  dailyRetention: number;
}

export interface RecentReport {
  id: string;
  taskId: number;
  taskTitle: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
  createdAt: string;
}

export interface NewPublishedTask {
  id: number;
  title: string;
  creatorName: string;
  createdAt: string;
  category?: string;
}
