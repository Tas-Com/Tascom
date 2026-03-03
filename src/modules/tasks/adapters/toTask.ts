import type { Task } from "../entities/Task";
import type { TaskResponse } from "../repository/TasksDtos";

export const toTask = (response: TaskResponse): Task => {
  return {
    id: response.id,
    title: response.title,
    description: response.description,
    points: response.pointsOffered || 0,
    pointsOffered: response.pointsOffered,
    status: response.status,
    priority: response.priority,
    category: response.category,
    createdAt: response.createdAt,
    creatorId: response.creatorId,
    latitude: Number(response.latitude),
    longitude: Number(response.longitude),
    deadline: response.deadline,
    assets: response.assets,
    creator: response.creator
      ? {
          ...response.creator,
          id: String(response.creator.id),
        }
      : undefined,
    likesCount: response.likesCount || response.numOfLikes,
    commentsCount: response.commentsCount,
    isLiked: response.isLiked,
    isSaved: response.isSaved,
    isCompleted: response.isCompleted,
    claimerId: response.claimantId,
    claimer: response.claimer
      ? {
          ...response.claimer,
          id: String(response.claimer.id),
        }
      : undefined,
    numOfLikes: response.numOfLikes,
    claims: response.claims,
  };
};

export const toTaskCardData = (task: Task) => {
  const mainAsset = task.assets?.[0];
  const defaultImage = "/cat.jpg";

  return {
    taskId: String(task.id),
    taskTitle: task.title,
    description: task.description,
    categories: [task.category],
    location: "",
    duration: "1 hour",
    points: task.points || task.pointsOffered || 0,
    imageUrl: mainAsset?.url || defaultImage,
    likes: task.likesCount || task.numOfLikes || 0,
    comments: task.commentsCount || 0,
    postedTime: formatTimeAgo(task.createdAt),
    priority: task.priority,
    taskerName: task.creator?.name || "Unknown",
    rating: task.creator?.rating || task.creator?.ratingAvg || 0,
    taskerImage: task.creator?.avatar || task.creator?.assets?.[0]?.url || "",
  };
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return date.toLocaleDateString();
};
