import { apiClient } from "@/shared/api/client";
import type { UsersRepo } from "./UsersRepo";
import type { AdminUserResponse, ExportUsersDto } from "./UsersDtos";
import type { ApiResponse } from "@/shared/api/types";

export const restUsers = (): UsersRepo => ({
  getUserById: async (id) => {
    const res = await apiClient.get<ApiResponse<AdminUserResponse>>(`/users/${id}`);
    return res.data;
  },
  updateUser: async (id, data) => {
    return apiClient.patch(`/users/${id}`, data);
  },
  deleteUser: async (id) => {
    // Admin specific delete endpoint is /admin/users/{id}
    return apiClient.delete(`/admin/users/${id}`);
  },
  searchUsers: async (query, page = 1, limit = 10, status, registrationDate) => {
    const response = await apiClient.get<ApiResponse<AdminUserResponse[]>>("/admin/users", {
      params: { 
        q: query || undefined, 
        page, 
        limit,
        status: status || undefined,
        registrationDate: registrationDate || undefined
      }
    });
    
    return {
      data: response.data,
      total: response.meta?.total || 0,
      meta: response.meta
    };
  },
  getGlobalUsersStats: async () => {
    const res = await apiClient.get<ApiResponse<any>>("/admin/users/stats");
    return res.data;
  },
  getUserStats: async (id) => {
    const res = await apiClient.get<ApiResponse<any>>(`/admin/users/${id}`);
    return res.data;
  },
  getUserTasks: async (id) => {
    const res = await apiClient.get<ApiResponse<{ tasks: any[] }>>(`/admin/users/tasks/${id}`);
    return res.data?.tasks || [];
  },
  exportUsers: async (dto: ExportUsersDto, format = 'xlsx') => {
    const res = await apiClient.post(`/admin/users/export`, dto, {
      params: { format },
      responseType: 'blob'
    });
    return res as unknown as Blob;
  },
  suspendUser: async (userId) => {
    return apiClient.post(`/admin/users/suspend-user`, { suspendUserId: userId });
  },
  banUser: async (userId) => {
    return apiClient.post(`/admin/users/band-user`, { bannedUserId: userId });
  },
  toggleUserStatus: async (id) => {
    return apiClient.patch(`/admin/users/toggle-status/${id}`, {});
  },
});
