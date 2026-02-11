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
    <div className="bg-white rounded-[16px] p-6 space-y-4 w-full max-w-2xl lg:max-w-[700px] shadow-sm border border-gray-100">
      <TaskCardHeader
        taskerName={taskerName}
        rating={rating}
        postedTime={postedTime}
        taskerImage={taskerImage}
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
