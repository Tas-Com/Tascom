import { Heart, MessageCircle, Forward } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmTaskClaimModal } from "../common/ConfirmTaskClaimModal";
import { ConfirmCancelClaimModal } from "../common/ConfirmCancelClaimModal";
import {
  useCreateClaim,
  useMyClaims,
  useCancelClaim,
} from "@/modules/tasks/claims/hooks/useClaims";
import { Button } from "../ui";

interface TaskCardActionsProps {
  taskId: string;
  totalComments: number;
  isTaskLiked: boolean;
  currentLikes: number;
  onToggleComments: () => void;
  onLike?: () => void;
}

export function TaskCardActions({
  taskId,
  totalComments,
  isTaskLiked,
  currentLikes,
  onToggleComments,
  onLike,
}: TaskCardActionsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const createClaim = useCreateClaim();
  const cancelClaim = useCancelClaim();
  const taskIdNum = parseInt(taskId, 10);
  const { data: myClaimsData } = useMyClaims();

  // Find the current user's pending claim on this task
  const myPendingClaim = myClaimsData?.data?.find(
    (claim) =>
      String(claim.taskId) === String(taskId) &&
      claim.status === "PENDING",
  );

  const handleConfirmClaim = async () => {
    if (isNaN(taskIdNum)) {
      console.error("Invalid task ID:", taskId);
      return;
    }
    try {
      await createClaim.mutateAsync({ taskId: taskIdNum });
      setShowConfirmModal(false);
      toast.success("Task claimed successfully!");
    } catch (error: unknown) {
      setShowConfirmModal(false);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to claim task. Please try again.";
      toast.error(message);
    }
  };

  const handleCancelClaim = async () => {
    if (!myPendingClaim) return;
    try {
      await cancelClaim.mutateAsync(Number(myPendingClaim.id));
      setShowCancelModal(false);
      toast.success("Claim cancelled successfully!");
    } catch (error: unknown) {
      setShowCancelModal(false);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to cancel claim. Please try again.";
      toast.error(message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            className="flex items-center gap-1 h-8.5 px-3 py-2 bg-bg-primary rounded-[40px] text-caption2 hover:text-brand-purple transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onLike) {
                onLike();
              }
            }}
          >
            <Heart
              size={18}
              className={`${
                isTaskLiked
                  ? "text-icon-liked fill-current"
                  : "text-icon-default"
              }`}
            />
            <span className="text-text-primary">{currentLikes}</span>
          </button>

          <button
            className="flex items-center gap-1 h-8.5 px-3 py-2 bg-bg-primary rounded-[40px] text-caption2 hover:text-brand-purple transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComments();
            }}
          >
            <MessageCircle size={18} className="text-icon-default" />
            <span className="text-text-primary">{totalComments}</span>
          </button>

          <button className="flex items-center justify-center w-10.5 h-8.5 px-3 py-2 bg-bg-primary rounded-[40px] text-caption2 hover:text-brand-purple transition-colors">
            <Forward size={20} className="text-icon-default" />
          </button>
        </div>

        {myPendingClaim ? (
          <Button
            onClick={() => setShowCancelModal(true)}
            className="bg-brand-purple text-btn-s text-white px-4 md:px-6 py-2 rounded-[103px] whitespace-nowrap"
          >
            Cancel Claim
          </Button>
        ) : (
          <Button
            onClick={() => setShowConfirmModal(true)}
            className="bg-brand-purple text-btn-s text-white px-4 md:px-6 py-2 rounded-[103px] whitespace-nowrap"
          >
            Claim Task
          </Button>
        )}
      </div>

      <ConfirmTaskClaimModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClaim}
      />

      <ConfirmCancelClaimModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelClaim}
      />
    </>
  );
}
