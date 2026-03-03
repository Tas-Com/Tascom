import { apiClient } from "@/shared/api/client";
import type { ClaimsRepo } from "./ClaimsRepo";
import type {
  CreateClaimDto,
  ClaimsResponse,
  MyClaimsResponse,
  ClaimResponse,
} from "../entities/Claim";

export const restClaims = (): ClaimsRepo => ({
  createClaim: async (data: CreateClaimDto) => {
    return apiClient.post<ClaimResponse>("/task-claims", data);
  },

  getClaimsByTask: async (taskId: number) => {
    return apiClient.get<ClaimsResponse>(`/task-claims?taskId=${taskId}`);
  },

  getMyTasks: async () => {
    return apiClient.get<MyClaimsResponse>("/task-claims/my-tasks");
  },

  getMyClaims: async () => {
    return apiClient.get<MyClaimsResponse>("/task-claims/me");
  },

  acceptClaim: async (id: number) => {
    return apiClient.patch<ClaimResponse>(`/task-claims/accept/${id}`, {});
  },

  rejectClaim: async (id: number) => {
    return apiClient.patch<ClaimResponse>(`/task-claims/reject/${id}`, {});
  },

  cancelClaim: async (id: number) => {
    return apiClient.patch<ClaimResponse>(`/task-claims/cancel/${id}`, {});
  },
});
