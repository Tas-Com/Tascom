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
    saved: boolean;
    numOfLikes: number;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    claims: any[];
}

export interface TaskClaimDto {
    id: string;
    claimerId: string;
    taskId: string;
    status: string;
    createdAt: string;
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
