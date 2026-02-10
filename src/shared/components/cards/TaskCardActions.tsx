import { Heart, MessageCircle, Forward } from "lucide-react";
import { useLikesStore } from "@/store/likesStore";

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

  return (
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
            className={`${isTaskLiked ? "text-icon-liked fill-current" : "text-icon-default"}`}
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
          <MessageCircle
            size={20}
            className="text-icon-default cursor-pointer"
          />
          <span>{totalComments}</span>
        </button>
        <button className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors">
          <Forward size={25} className="text-icon-default" />
        </button>
      </div>
      <button className="bg-brand-purple text-btn-s text-white px-6 py-2 rounded-[103px]">
        Claim Task
      </button>
    </div>
  );
}
