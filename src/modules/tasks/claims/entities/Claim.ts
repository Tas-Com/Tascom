export interface TaskClaim {
  id: string;
  taskId: string;
  claimantId: string;
  status: string;
  claimedAt: string;
  task?: {
    id: string;
    creatorId: string;
    assigneeId: string | null;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    deadline?: string;
    pointsOffered?: number;
    status: string;
    priority: string;
    category: string;
    numOfLikes?: number;
    createdAt: string;
  };
}

export interface CreateClaimDto {
  taskId: number;
}

export interface ClaimsResponse {
  success: boolean;
  data: TaskClaim[];
}

export interface MyClaimsResponse {
  success: boolean;
  data: TaskClaim[];
}

export interface MyTasksResponse {
  success: boolean;
  data: {
    id: string;
    creatorId: string;
    assigneeId: string | null;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    deadline?: string;
    pointsOffered: number;
    status: string;
    priority: string;
    category: string;
    numOfLikes: number;
    createdAt: string;
    claims?: TaskClaim[];
  }[];
}

export interface ClaimResponse {
  success: boolean;
  data?: TaskClaim;
  message?: string;
}
