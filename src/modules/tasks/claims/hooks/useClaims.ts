import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { restClaims } from "../repository/restClaims";
import type { CreateClaimDto } from "../entities/Claim";

const claimsRepo = restClaims();

export const useClaimsByTask = (taskId: number) => {
  return useQuery({
    queryKey: ["claims", taskId],
    queryFn: () => claimsRepo.getClaimsByTask(taskId),
    enabled: !!taskId,
  });
};

export const useCreateClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClaimDto) => claimsRepo.createClaim(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
    },
  });
};

export const useMyTasks = () => {
  return useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => claimsRepo.getMyTasks(),
  });
};

export const useMyClaims = () => {
  return useQuery({
    queryKey: ["my-claims"],
    queryFn: () => claimsRepo.getMyClaims(),
  });
};

export const useAcceptClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => claimsRepo.acceptClaim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useRejectClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => claimsRepo.rejectClaim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
    },
  });
};

export const useCancelClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => claimsRepo.cancelClaim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
    },
  });
};
