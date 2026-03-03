import type {
  CreateTaskDto,
  TaskFilters,
  TaskResponse,
  PaginatedResponse,
  CreateTaskResponse,
  TaskOperationResponse,
  SavedTasksResponse,
  TopTaskersResponse,
  TrendingCategoriesResponse,
  MapTasksResponse,
  ApiResponse,
} from "./TasksDtos";

export interface TasksRepo {
  createTask: (data: CreateTaskDto) => Promise<CreateTaskResponse>;
  getTasks: (filters: TaskFilters) => Promise<PaginatedResponse<TaskResponse>>;
  getTaskById: (id: number) => Promise<ApiResponse<TaskResponse>>;
  updateTask: (
    id: number,
    data: Partial<CreateTaskDto>,
  ) => Promise<ApiResponse<TaskResponse>>;
  deleteTask: (id: number) => Promise<void>;
  saveTask: (id: number) => Promise<TaskOperationResponse>;
  getSavedTasks: () => Promise<SavedTasksResponse>;
  likeTask: (id: number) => Promise<TaskOperationResponse>;
  completeTask: (id: number) => Promise<TaskOperationResponse>;
  getMapTasks: () => Promise<MapTasksResponse>;
  getTopTaskers: () => Promise<TopTaskersResponse>;
  getTrendingCategories: () => Promise<TrendingCategoriesResponse>;
}
