import { useState } from "react";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskCardContent } from "./TaskCardContent";
import { TaskCardActions } from "./TaskCardActions";
import { CommentSection } from "./CommentSection";
import { useLikeTask } from "@/modules/tasks/hooks/useTasks";
import { useCommentsByTask } from "@/modules/tasks/comments/hooks/useComments";

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
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const likeTask = useLikeTask();
  const { data: commentsData } = useCommentsByTask(Number(taskId));
  const actualCommentCount = commentsData?.data?.length ?? comments;

  const handleLike = async () => {
    const taskIdNum = Number(taskId);
    try {
      await likeTask.mutateAsync(taskIdNum);
      setLocalIsLiked(!localIsLiked);
      setLocalLikes(localIsLiked ? localLikes - 1 : localLikes + 1);
    } catch (error) {
      console.error("Failed to like task:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl space-y-4 w-full shadow-sm border border-gray-100 ${compact ? "p-4 max-w-md lg:max-w-105" : "p-4 md:p-6 max-w-2xl lg:max-w-4xl mx-auto w-full"
        }`}
    >
      <TaskCardHeader
        taskId={taskId}
        taskerName={taskerName}
        rating={rating}
        postedTime={postedTime}
        taskerImage={taskerImage}
        compact={compact}
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
        isTaskLiked={localIsLiked}
        currentLikes={localLikes}
        onToggleComments={() => setShowComments(!showComments)}
        onLike={handleLike}
      />

      {showComments && <CommentSection taskId={taskId} />}
    </div>
  );
}
