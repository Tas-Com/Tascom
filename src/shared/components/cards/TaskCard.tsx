import { useState } from "react";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskCardContent } from "./TaskCardContent";
import { TaskCardActions } from "./TaskCardActions";
import { CommentSection } from "./CommentSection";
import { useLikeTask, useSaveTask } from "@/modules/tasks/hooks/useTasks";
import { useCommentsByTask } from "@/modules/tasks/comments/hooks/useComments";
import { useLikesStore } from "@/store/likesStore";

type TaskCardProps = {
  taskerName: string;
  rating: number;
  taskTitle: string;
  description: string;
  categories: string[];
  location: string;
  duration: string;
  points: number;
  imageUrl: string;
  likes: number;
  comments: number;
  postedTime: string;
  taskerImage: string;
  priority: string;
  taskId: string;
  compact?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  defaultShowComments?: boolean;
};

export function TaskCard({
  taskerName,
  rating,
  taskTitle,
  description,
  categories,
  location,
  duration,
  points,
  imageUrl,
  likes,
  comments,
  postedTime,
  taskerImage,
  priority,
  taskId,
  compact = false,
  isLiked = false,
  isSaved = false,
  defaultShowComments = false,
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(defaultShowComments);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  const { isLiked: isStoreLiked, getLikes, toggleLike } = useLikesStore();
  const storeLiked = isStoreLiked(taskId);
  const storeLikes = getLikes(taskId);

  // Store is the source of truth for likes (persisted + instant)
  const effectiveIsLiked = storeLiked || isLiked;
  const effectiveLikes = storeLikes || likes;

  const likeTask = useLikeTask();
  const saveTask = useSaveTask();
  const { data: commentsData } = useCommentsByTask(Number(taskId));
  const actualCommentCount = commentsData?.data?.length ?? comments;

  const handleLike = async () => {
    const taskIdNum = Number(taskId);
    // Toggle store first for instant UI update
    toggleLike(taskId, effectiveLikes);
    try {
      await likeTask.mutateAsync(taskIdNum);
    } catch (error) {
      // Revert on failure
      toggleLike(taskId, effectiveLikes);
      console.error("Failed to like task:", error);
    }
  };

  const handleSave = async () => {
    const taskIdNum = Number(taskId);
    // Optimistic update
    setLocalIsSaved((prev) => !prev);
    try {
      await saveTask.mutateAsync(taskIdNum);
    } catch (error) {
      // Revert on failure
      setLocalIsSaved((prev) => !prev);
      console.error("Failed to save task:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl space-y-4 w-full shadow-sm border border-gray-100 ${
        compact
          ? "p-4 max-w-md lg:max-w-105"
          : "p-4 md:p-6 max-w-2xl lg:max-w-4xl mx-auto w-full"
      }`}
    >
      <TaskCardHeader
        taskId={taskId}
        taskerName={taskerName}
        rating={rating}
        postedTime={postedTime}
        taskerImage={taskerImage}
        compact={compact}
        isSaved={localIsSaved}
        onSave={handleSave}
      />

      <TaskCardContent
        taskTitle={taskTitle}
        description={description}
        categories={categories}
        location={location}
        duration={duration}
        points={points}
        imageUrl={imageUrl}
        priority={priority}
        taskId={taskId}
        compact={compact}
      />

      <TaskCardActions
        taskId={taskId}
        totalComments={actualCommentCount}
        isTaskLiked={effectiveIsLiked}
        currentLikes={effectiveLikes}
        onToggleComments={() => setShowComments(!showComments)}
        onLike={handleLike}
      />

      {showComments && <CommentSection taskId={taskId} />}
    </div>
  );
}
