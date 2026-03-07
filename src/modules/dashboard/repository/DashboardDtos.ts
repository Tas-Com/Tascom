export interface DashboardClaim {
  id: string;
  taskId: string;
  claimantId: string;
  status: string;
  claimedAt: string;
  claimant?: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export interface Task {
  id: string;
  creatorId: string;
  assigneeId: string | null;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  deadline: string;
  pointsOffered: number;
  status: string;
  priority: string;
  category: string;
  saved?: boolean;
  numOfLikes: number;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
  isDeleted: boolean;
  claims: DashboardClaim[];
}

export interface TaskClaimDto {
  id: string;
  taskId: string;
  claimantId: string;
  status: string;
  claimedAt: string;
  task: Task;
}

export interface MyTasksResponse {
  success: boolean;
  data: Task[];
}

export interface MyClaimsResponse {
  success: boolean;
  data: TaskClaimDto[];
}
