import { apiClient } from "@/shared/api/client";
import type { TasksRepo } from "./TasksRepo";
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

const buildQueryString = (filters: TaskFilters): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

export const restTasks = (): TasksRepo => ({
  createTask: async (data: CreateTaskDto) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("priority", data.priority);
    formData.append("deadline", data.deadline);
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));

    if (data.images) {
      data.images.forEach((image) => {
        formData.append("file", image);
      });
    }

    // Don't set Content-Type manually - axios will set it with correct boundary
    return apiClient.post<CreateTaskResponse>("/tasks/Create-Task", formData);
  },

  getTasks: async (filters: TaskFilters) => {
    const queryString = buildQueryString(filters);
    return apiClient.get<PaginatedResponse<TaskResponse>>(
      `/tasks?${queryString}`,
    );
  },

  getTaskById: async (id: number) => {
    return apiClient.get<ApiResponse<TaskResponse>>(`/tasks/${id}`);
  },

  updateTask: async (id: number, data: Partial<CreateTaskDto>) => {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.category) formData.append("category", data.category);
    if (data.priority) formData.append("priority", data.priority);
    if (data.deadline) formData.append("deadline", data.deadline);
    if (data.latitude) formData.append("latitude", String(data.latitude));
    if (data.longitude) formData.append("longitude", String(data.longitude));

    if (data.images) {
      data.images.forEach((image) => {
        formData.append("file", image);
      });
    }

    return apiClient.patch<ApiResponse<TaskResponse>>(`/tasks/${id}`, formData);
  },

  deleteTask: async (id: number) => {
    return apiClient.delete(`/tasks/${id}`);
  },

  saveTask: async (id: number) => {
    return apiClient.post<TaskOperationResponse>(`/tasks/save/${id}`, {});
  },

  getSavedTasks: async () => {
    return apiClient.get<SavedTasksResponse>("/tasks/get_saved");
  },

  likeTask: async (id: number) => {
    return apiClient.post<TaskOperationResponse>(`/tasks/like/${id}`, {
      likeStatus: true,
    });
  },

  completeTask: async (id: number) => {
    return apiClient.post<TaskOperationResponse>(`/tasks/complete/${id}`, {});
  },

  getMapTasks: async () => {
    return apiClient.get<MapTasksResponse>("/tasks/map");
  },

  getTopTaskers: async () => {
    return apiClient.get<TopTaskersResponse>("/tasks/top-taskers?limit=10");
  },

  getTrendingCategories: async () => {
    return apiClient.get<TrendingCategoriesResponse>(
      "/tasks/trending-categories?limit=3",
    );
  },
});
