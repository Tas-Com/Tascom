import type { ApiResponse } from "@/shared/api/types";
import type { AdminUserResponse, ExportUsersDto } from "./UsersDtos";

export interface UsersRepo {
  getUserById(id: string): Promise<AdminUserResponse>;
  updateUser: (id: number, data: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  searchUsers: (query: string, page: number, limit: number, status?: string, registrationDate?: string) => Promise<{ 
    data: AdminUserResponse[], 
    total: number,
    meta?: ApiResponse<any>['meta'] 
  }>;
  getGlobalUsersStats: () => Promise<any>;
  getUserStats: (id: string) => Promise<any>;
  getUserTasks: (id: string) => Promise<any[]>;
  exportUsers: (dto: ExportUsersDto, format?: 'xlsx' | 'csv') => Promise<Blob>;
  suspendUser: (userId: number) => Promise<void>;
  banUser: (userId: number) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
}
