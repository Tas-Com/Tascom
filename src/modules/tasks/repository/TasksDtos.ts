export interface CreateTaskDto {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline: string;
  latitude: number;
  longitude: number;
  images?: File[];
}

export interface TaskFilters {
  userLat?: number;
  userLng?: number;
  sortBy?: string;
  maxMeters?: number;
  minMeters?: number;
  maxDistance?: number;
  minDistance?: number;
  maxPoints?: number;
  minPoints?: number;
  priority?: string;
  priorities?: string;
  category?: string;
  categories?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginatedMeta;
}

export interface TaskResponse {
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
  completedAt?: string | null;
  updatedAt: string;
  isDeleted: boolean;
  assets?: Asset[];
  creator?: User;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isCompleted?: boolean;
  claimerId?: string;
  claimantId?: string;
  claimer?: User;
  claims?: Claim[];
}

export interface Asset {
  id: string;
  url: string;
  fileType: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  assets?: Asset[];
  rating?: number;
  ratingAvg?: number;
  email?: string;
}

export interface Claim {
  id: string;
  taskId: string;
  claimantId: string;
  status: string;
  claimedAt: string;
  task?: TaskResponse;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CreateTaskResponse {
  success: boolean;
  data: {
    createdTask: TaskResponse;
  };
}

export interface TaskOperationResponse {
  success: boolean;
  message: string;
}

export interface SavedTasksResponse {
  success: boolean;
  data: TaskResponse[];
}

export interface TopTaskersResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    completedTasks: number;
  }[];
}

export interface TrendingCategoriesResponse {
  success: boolean;
  data: {
    category: string;
    count: number;
  }[];
}

export interface MapTasksResponse {
  success: boolean;
  data: {
    data: TaskResponse[];
    total: number;
  };
}
