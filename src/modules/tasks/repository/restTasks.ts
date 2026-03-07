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

export const restTasks = (): TasksRepo => ({
  createTask: async (data: CreateTaskDto) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("priority", data.priority);

    if (data.deadline) formData.append("deadline", data.deadline);
    if (data.latitude !== undefined && data.latitude !== null) {
      formData.append("latitude", String(data.latitude));
    }
    if (data.longitude !== undefined && data.longitude !== null) {
      formData.append("longitude", String(data.longitude));
    }

    if (data.images && data.images.length > 0) {
      formData.append("file", data.images[0]);
    }

    // Don't set Content-Type manually - axios will set it with correct boundary
    return apiClient.post<CreateTaskResponse>("/tasks/Create-Task", formData, {
      timeout: 30000,
    });
  },

  getTasks: async (filters?: TaskFilters) => {
    return apiClient.get<PaginatedResponse<TaskResponse>>("/tasks", {
      params: filters,
    });
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

    if (data.latitude !== undefined && data.latitude !== null) {
      formData.append("latitude", String(data.latitude));
    }
    if (data.longitude !== undefined && data.longitude !== null) {
      formData.append("longitude", String(data.longitude));
    }

    if (data.images && data.images.length > 0) {
      formData.append("file", data.images[0]);
    }

    return apiClient.patch<ApiResponse<TaskResponse>>(
      `/tasks/${id}`,
      formData,
      {
        timeout: 30000,
      },
    );
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

  getTopTaskers: async (limit: number = 10) => {
    return apiClient.get<TopTaskersResponse>(
      `/tasks/top-taskers?limit=${limit}`,
    );
  },

  getTrendingCategories: async () => {
    return apiClient.get<TrendingCategoriesResponse>(
      "/tasks/trending-categories?limit=3",
    );
  },
});
