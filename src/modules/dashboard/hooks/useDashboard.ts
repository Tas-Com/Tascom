import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { restDashboard } from "../repository/restDashboard";
import { apiClient } from "@/shared/api/client";

const dashboardRepo = restDashboard();

export const useMyTasks = () => {
  return useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => dashboardRepo.getMyTasks(),
  });
};

export const useMyClaims = () => {
  return useQuery({
    queryKey: ["my-claims"],
    queryFn: () => dashboardRepo.getMyClaims(),
  });
};

export const useRemoveTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
    },
  });
};

export const useMarkTaskDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient.post(`/tasks/complete/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
    },
  });
};

export const useCancelTaskClaim = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiClient.patch(`/task-claims/cancel/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
    },
  });
};

export const useAcceptClaim = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiClient.patch(`/task-claims/accept/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
};

export const useRejectClaim = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiClient.patch(`/task-claims/reject/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
};
