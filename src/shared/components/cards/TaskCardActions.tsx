import { Heart, MessageCircle, Forward } from "lucide-react";
import { useState } from "react";
import { useLikesStore } from "@/store/likesStore";
import { ConfirmTaskClaimModal } from "../common/ConfirmTaskClaimModal";

interface TaskCardActionsProps {
  taskId: string;
  likes: number;
  totalComments: number;
  isTaskLiked: boolean;
  currentLikes: number;
  onToggleComments: () => void;
}

export function TaskCardActions({
  taskId,
  likes,
  totalComments,
  isTaskLiked,
  currentLikes,
  onToggleComments,
}: TaskCardActionsProps) {
  const { toggleLike } = useLikesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmClaim = () => {
    console.log("Task claimed:", taskId);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(taskId, likes);
            }}
          >
            <Heart
              size={20}
              className={`${
                isTaskLiked
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
          className="bg-brand-purple text-btn-s text-white px-6 py-2 rounded-[103px]"
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
