import type {
  CreateClaimDto,
  ClaimsResponse,
  MyClaimsResponse,
  ClaimResponse,
} from "../entities/Claim";

export interface ClaimsRepo {
  createClaim: (data: CreateClaimDto) => Promise<ClaimResponse>;
  getClaimsByTask: (taskId: number) => Promise<ClaimsResponse>;
  getMyTasks: () => Promise<MyClaimsResponse>;
  getMyClaims: () => Promise<MyClaimsResponse>;
  acceptClaim: (id: number) => Promise<ClaimResponse>;
  rejectClaim: (id: number) => Promise<ClaimResponse>;
  cancelClaim: (id: number) => Promise<ClaimResponse>;
}
