import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { restUsers } from "../repository/restUsers";
import type { ExportUsersDto } from "../repository/UsersDtos";

const usersRepo = restUsers();

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => usersRepo.getUserById(id),
    enabled: !!id,
  });
}

export function useAdminUserStats(id: string) {
  return useQuery({
    queryKey: ['admin', 'users', 'stats', id],
    queryFn: () => usersRepo.getUserStats(id),
    enabled: !!id,
  });
}

export function useAdminUserTasks(id: string) {
  return useQuery({
    queryKey: ['admin', 'users', 'tasks', id],
    queryFn: () => usersRepo.getUserTasks(id),
    enabled: !!id,
  });
}

export function useSearchUsers(query: string, page: number, limit: number, status?: string, registrationDate?: string) {
  return useQuery({
    queryKey: ['admin', 'users', 'search', query, page, limit, status, registrationDate],
    queryFn: () => usersRepo.searchUsers(query, page, limit, status, registrationDate),
  });
}

export function useExportUsers() {
  return useMutation({
    mutationFn: ({ dto, format }: { dto: ExportUsersDto, format?: 'xlsx' | 'csv' }) => 
      usersRepo.exportUsers(dto, format),
    onSuccess: (blob, { format }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users-export-${new Date().toISOString()}.${format || 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => usersRepo.suspendUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}

export function useBanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => usersRepo.banUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersRepo.toggleUserStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}

export const useGlobalUsersStats = () => {
  return useQuery({
    queryKey: ['admin', 'users', 'stats'],
    queryFn: () => usersRepo.getGlobalUsersStats(),
  });
};

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersRepo.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'admin', 'users'] });
    },
  });
}
