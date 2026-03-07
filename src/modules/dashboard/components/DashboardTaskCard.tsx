import { useState } from "react";
import {
  Trash2,
  Users,
  X,
  Check,
  ClipboardList,
  Wrench,
  GraduationCap,
  Heart,
  Home,
  Car,
  MapPin,
  Zap,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import type { Task } from "../repository/DashboardDtos";

type TaskStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

interface DashboardTaskCardProps {
  task: Task;
  mode: "posted" | "claimed";
  claimInfo?: {
    id: string;
    status: string;
    claimantId: string;
  };
  onRemoveTask?: (taskId: number) => void;
  onCancelTask?: (claimId: number) => void;
  onMarkDone?: (taskId: number) => void;
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> =
  {
    OPEN: {
      label: "Active",
      color: "text-status-active",
      bg: "bg-green-50",
    },
    IN_PROGRESS: {
      label: "In progress",
      color: "text-status-in-progress",
      bg: "bg-orange-50",
    },
    COMPLETED: {
      label: "Completed",
      color: "text-status-completed",
      bg: "bg-blue-50",
    },
    CANCELLED: {
      label: "Cancelled",
      color: "text-status-canceled",
      bg: "bg-red-50",
    },
  };

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Errands":
      return <ClipboardList size={14} />;
    case "Repairs":
      return <Wrench size={14} />;
    case "Tutoring":
      return <GraduationCap size={14} />;
    case "PetCare":
      return <Heart size={14} />;
    case "HomeServices":
      return <Home size={14} />;
    case "Transportation":
      return <Car size={14} />;
    default:
      return <ClipboardList size={14} />;
  }
};

const formatCategoryLabel = (category: string) => {
  return category.replace(/([A-Z])/g, " $1").trim();
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return date.toLocaleDateString();
};

export const DashboardTaskCard = ({
  task,
  mode,
  claimInfo,
  onRemoveTask,
  onCancelTask,
  onMarkDone,
}: DashboardTaskCardProps) => {
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isMarkingDone, setIsMarkingDone] = useState(false);

  const taskStatus = (task.status || "OPEN").toUpperCase().trim() as TaskStatus;

  // For claimed tasks, derive display status from claim status
  const claimStatus = claimInfo?.status?.toUpperCase().trim();
  const effectiveStatus: TaskStatus =
    mode === "claimed" && claimStatus
      ? claimStatus === "PENDING"
        ? "OPEN"
        : claimStatus === "ACCEPTED"
          ? "IN_PROGRESS"
          : claimStatus === "CANCELLED" || claimStatus === "REJECTED"
            ? "CANCELLED"
            : taskStatus
      : taskStatus;

  const status = effectiveStatus;
  const statusInfo = STATUS_MAP[status] || STATUS_MAP.OPEN;

  const { locationName } = useReverseGeocode(task.latitude, task.longitude);

  // For posted tasks in progress/completed/cancelled, show the assignee
  const assigneeId =
    mode === "posted" && task.assigneeId ? task.assigneeId : null;
  const { data: assigneeUser } = useUserById(assigneeId);

  // For claimed tasks, show the poster (creatorId)
  const posterId = mode === "claimed" ? task.creatorId : null;
  const { data: posterUser } = useUserById(posterId);

  const showHelper =
    mode === "posted" &&
    (status === "IN_PROGRESS" ||
      status === "COMPLETED" ||
      status === "CANCELLED");
  const showPoster = mode === "claimed";

  const helperName = assigneeUser?.name || "Unknown";
  const helperAvatar = assigneeUser?.assets?.[0]?.url || "";

  const posterName = posterUser?.name || "Unknown";
  const posterAvatar = posterUser?.assets?.[0]?.url || "";

  const pendingClaimsCount =
    task.claims?.filter((c) => c.status === "PENDING").length || 0;

  const handleRemove = async () => {
    if (!onRemoveTask) return;
    setIsRemoving(true);
    try {
      await onRemoveTask(Number(task.id));
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCancel = async () => {
    if (!onCancelTask || !claimInfo) return;
    setIsCancelling(true);
    try {
      await onCancelTask(Number(claimInfo.id));
    } finally {
      setIsCancelling(false);
    }
  };

  const handleMarkDone = async () => {
    if (!onMarkDone) return;
    setIsMarkingDone(true);
    try {
      await onMarkDone(Number(task.id));
    } finally {
      setIsMarkingDone(false);
    }
  };

  const cancelledDate =
    status === "CANCELLED" && task.updatedAt
      ? new Date(task.updatedAt).toLocaleDateString("en-GB")
      : null;

  return (
    <div className="w-full max-w-230.5 min-h-51.25 rounded-2xl border border-[#E8E8EC] bg-white p-6 flex flex-col gap-4">
      {/* Status Badge */}
      <span
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit",
          statusInfo.bg,
          statusInfo.color,
        )}
      >
        {statusInfo.label}
      </span>

      {/* Title & Date */}
      <div>
        <h3 className="font-[Poppins] font-semibold text-[20px] leading-[1.3] text-text-primary">
          {task.title}
        </h3>
        <p className="font-[Poppins] text-[14px] text-text-secondary mt-0.5">
          {status === "CANCELLED" && cancelledDate
            ? `Cancelled date: ${cancelledDate}`
            : `Posted ${formatTimeAgo(task.createdAt)}`}
        </p>
      </div>

      {/* Helper / Poster info */}
      {showHelper && assigneeId && (
        <div className="flex items-center gap-2">
          {helperAvatar ? (
            <img
              src={helperAvatar}
              alt={helperName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm font-semibold">
              {helperName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-[Poppins] text-[14px] font-medium text-text-primary">
            Helper: <strong>{helperName}</strong>
          </span>
        </div>
      )}

      {showPoster && (
        <div className="flex items-center gap-2">
          {posterAvatar ? (
            <img
              src={posterAvatar}
              alt={posterName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm font-semibold">
              {posterName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-[Poppins] text-[14px] font-medium text-text-primary">
            Poster: <strong>{posterName}</strong>
          </span>
        </div>
      )}

      {/* Bottom row: Tags + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F0FF] text-brand-purple rounded-full text-xs font-medium">
            {getCategoryIcon(task.category)}
            {formatCategoryLabel(task.category)}
          </span>

          {/* Location */}
          {locationName && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F0FF] text-brand-purple rounded-full text-xs font-medium">
              <MapPin size={14} />
              {locationName}
            </span>
          )}

          {/* Points */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F0FF] text-brand-purple rounded-full text-xs font-medium">
            <Zap size={14} />
            {task.pointsOffered} points
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* POSTED: Remove Task always visible */}
          {mode === "posted" && (
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="inline-flex items-center gap-2 px-4 py-2 border border-state-error text-state-error rounded-full text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
              {isRemoving ? "Removing..." : "Remove Task"}
            </button>
          )}

          {/* POSTED + OPEN: View Applications */}
          {mode === "posted" && status === "OPEN" && (
            <button
              onClick={() => navigate({ to: "/profile/requests" })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-full text-sm font-medium hover:bg-brand-purple/90 transition-colors"
            >
              <Users size={16} />
              View Applications ({pendingClaimsCount})
            </button>
          )}

          {/* CLAIMED + PENDING: Cancel Claim */}
          {mode === "claimed" && claimStatus === "PENDING" && (
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="inline-flex items-center gap-2 px-4 py-2 border border-state-error text-state-error rounded-full text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <X size={16} />
              {isCancelling ? "Cancelling..." : "Cancel Claim"}
            </button>
          )}

          {/* Both tabs: IN_PROGRESS — Cancel Task + Mark as Done */}
          {status === "IN_PROGRESS" && (
            <>
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="inline-flex items-center gap-2 px-4 py-2 border border-state-error text-state-error rounded-full text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <X size={16} />
                {isCancelling ? "Cancelling..." : "Cancel Task"}
              </button>
              <button
                onClick={handleMarkDone}
                disabled={isMarkingDone}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-full text-sm font-medium hover:bg-brand-purple/90 transition-colors disabled:opacity-50"
              >
                <Check size={16} />
                {isMarkingDone ? "Marking..." : "Mark as Done"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
