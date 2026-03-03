import { Heart, MessageCircle, Forward } from "lucide-react";
import { useState } from "react";
import { ConfirmTaskClaimModal } from "../common/ConfirmTaskClaimModal";
import { useCreateClaim } from "@/modules/tasks/claims/hooks/useClaims";

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
  const createClaim = useCreateClaim();

  const handleConfirmClaim = async () => {
    const taskIdNum = parseInt(taskId, 10);
    if (isNaN(taskIdNum)) {
      console.error("Invalid task ID:", taskId);
      return;
    }
    try {
      await createClaim.mutateAsync({ taskId: taskIdNum });
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to claim task:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onLike) {
                onLike();
              }
            }}
          >
            <Heart
              size={20}
              className={`${isTaskLiked
                ? "text-icon-liked fill-current"
                : "text-icon-default"
                }`}
            />
            <span>{currentLikes}</span>
          </button>

          <button
            className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComments();
            }}
          >
            <MessageCircle size={20} className="text-icon-default" />
            <span>{totalComments}</span>
          </button>

          <button className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors">
            <Forward size={25} className="text-icon-default" />
          </button>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-brand-purple text-btn-s text-white px-4 md:px-6 py-2 rounded-[103px] whitespace-nowrap"
        >
          Claim Task
        </button>
      </div>

      <ConfirmTaskClaimModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClaim}
      />
    </>
  );
}
