import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, Send, Zap, CheckCircle } from "lucide-react";
import { useClaimsByTask } from "@/modules/tasks/claims/hooks/useClaims";
import {
  useAcceptClaim,
  useRejectClaim,
} from "@/modules/dashboard/hooks/useDashboard";
import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import type { Task } from "@/modules/dashboard/repository/DashboardDtos";

interface RequestTaskCardProps {
  task: Task;
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)} week ago`;
  return date.toLocaleDateString();
};

export const RequestTaskCard = ({ task }: RequestTaskCardProps) => {
  const { data: claimsData } = useClaimsByTask(Number(task.id));
  const claims = claimsData?.data || [];
  const pendingClaims = claims.filter((c) => c.status === "PENDING");

  if (pendingClaims.length === 0) return null;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0px 2px 20px 0px #0000001A" }}
    >
      {/* Task Header */}
      <div
        className="rounded-t-2xl"
        style={{
          background: "var(--colors-background-primary, #F9FAFB)",
          padding: "16px 24px",
          gap: "16px",
        }}
      >
        <Link
          to="/tasks/$taskId"
          params={{ taskId: task.id }}
          className="font-[Poppins] font-semibold text-[18px] text-text-primary hover:text-brand-purple transition-colors"
        >
          {task.title}
        </Link>
        <div className="flex items-center gap-4 mt-1">
          <span className="font-[Poppins] text-[14px] text-text-secondary">
            Posted {formatTimeAgo(task.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 font-[Poppins] text-[14px] text-brand-purple font-medium">
            <Zap size={14} />
            {task.pointsOffered} pts
          </span>
        </div>
      </div>

      {/* Claimants List */}
      <div className="divide-y divide-[#F1F0F0]">
        {pendingClaims.map((claim) => (
          <ClaimantRow
            key={claim.id}
            claimId={claim.id}
            claimantId={claim.claimantId}
            claimedAt={claim.claimedAt}
          />
        ))}
      </div>
    </div>
  );
};

interface ClaimantRowProps {
  claimId: string;
  claimantId: string;
  claimedAt: string;
}

const ClaimantRow = ({ claimId, claimantId, claimedAt }: ClaimantRowProps) => {
  const { data: user } = useUserById(claimantId);
  const acceptClaim = useAcceptClaim();
  const rejectClaim = useRejectClaim();
  const [actionTaken, setActionTaken] = useState<
    "accepted" | "rejected" | null
  >(null);

  const avatar = user?.assets?.[0]?.url || "";
  const name = user?.name || "Unknown User";
  const rating = user?.ratingAvg ?? 0;
  const completedTasks = (user as Record<string, unknown>)?.completedTasks as
    | number
    | undefined;

  const handleAccept = () => {
    setActionTaken("accepted");
    acceptClaim.mutate(Number(claimId));
  };

  const handleReject = () => {
    setActionTaken("rejected");
    rejectClaim.mutate(Number(claimId));
  };

  if (actionTaken) {
    return (
      <div className="px-6 py-4 flex items-center justify-center">
        <span className="font-[Poppins] text-[14px] text-text-secondary">
          {actionTaken === "accepted"
            ? `${name} has been accepted`
            : `Request from ${name} was ignored`}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-5 flex items-center gap-4">
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-lg font-semibold shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="font-[Poppins] font-semibold text-[16px] text-text-primary truncate">
          {name}
        </p>
        <div className="flex items-center gap-3 mt-1">
          {/* Tasks done badge */}
          {completedTasks != null && (
            <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#059669] px-2.5 py-0.5 rounded-full text-[13px] font-medium">
              <CheckCircle size={14} />
              {completedTasks} tasks done
            </span>
          )}
          {/* Rating */}
          <span className="inline-flex items-center gap-1 text-[13px]">
            <Star size={14} className="text-icon-star fill-icon-star" />
            <span className="font-[Poppins] font-medium text-text-primary">
              {rating.toFixed(1)}
            </span>
          </span>
          {/* Location icon */}
          <Send size={14} className="text-brand-purple" />
        </div>
      </div>

      {/* Sent time */}
      <span className="font-[Poppins] text-[13px] text-text-secondary whitespace-nowrap">
        Sent {formatTimeAgo(claimedAt)}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleReject}
          disabled={rejectClaim.isPending}
          className="px-5 py-2.5 border border-brand-purple text-brand-purple rounded-full text-[13px] font-medium hover:bg-purple-50 transition-colors disabled:opacity-50"
        >
          Ignore Request
        </button>
        <button
          onClick={handleAccept}
          disabled={acceptClaim.isPending}
          className="px-5 py-2.5 bg-brand-purple text-white rounded-full text-[13px] font-medium hover:bg-brand-purple/90 transition-colors disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
