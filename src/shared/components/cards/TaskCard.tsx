import { useState } from "react";
import { mockCommentsByTask } from "@/shared/data/mockComments";
import { useLikesStore } from "@/store/likesStore";
import { useCommentsStore } from "@/store/commentsStore";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskCardContent } from "./TaskCardContent";
import { TaskCardActions } from "./TaskCardActions";
import { CommentSection } from "./CommentSection";

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
  postedTime,
  taskerImage,
  priority,
  taskId,
  compact = false,
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { isLiked, getLikes } = useLikesStore();
  const { getComments } = useCommentsStore();

  const isTaskLiked = isLiked(taskId);
  const currentLikes = getLikes(taskId) || likes;

  const allComments = [
    ...(mockCommentsByTask[taskId] || []),
    ...getComments(taskId),
  ];
  const totalComments = allComments.filter(
    (comment) => !comment.replyTo,
  ).length;

  return (
    <div
      className={`bg-white rounded-2xl space-y-4 w-full shadow-sm border border-gray-100 ${
        compact ? "p-4 max-w-md lg:max-w-105" : "p-6 max-w-2xl lg:max-w-175"
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
        likes={likes}
        totalComments={totalComments}
        isTaskLiked={isTaskLiked}
        currentLikes={currentLikes}
        onToggleComments={() => setShowComments(!showComments)}
      />

      {showComments && <CommentSection taskId={taskId} />}
    </div>
  );
}
