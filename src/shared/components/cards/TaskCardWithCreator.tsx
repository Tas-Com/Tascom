import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import { TaskCard } from "./TaskCard";

interface TaskCardWithCreatorProps {
  taskId: string;
  creatorId: string;
  fallbackName?: string;
  fallbackRating?: number;
  location?: string;
  taskTitle: string;
  description: string;
  categories: string[];
  duration: string;
  points: number;
  imageUrl: string;
  likes: number;
  comments: number;
  postedTime: string;
  priority: string;
  compact?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  defaultShowComments?: boolean;
}
export const TaskCardWithCreator = ({
  taskId,
  creatorId,
  fallbackName = "Unknown",
  fallbackRating = 0,
  location = "",
  compact,
  isLiked,
  isSaved,
  defaultShowComments,
  ...cardProps
}: TaskCardWithCreatorProps) => {
  const { data: creator, isLoading: isCreatorLoading } = useUserById(creatorId);

  const rawAvatar =
    creator?.assets?.find((a) => !a.taskId)?.url ??
    creator?.assets?.[0]?.url ??
    "";
  const avatarUrl = rawAvatar === "null" ? "" : rawAvatar;

  const name = creator?.name ?? fallbackName;
  const rating = creator?.ratingAvg ?? fallbackRating;

  if (isCreatorLoading) {
    return (
      <div
        className={`bg-white rounded-2xl w-full shadow-sm border border-gray-100 animate-pulse ${
          compact
            ? "p-4 max-w-md lg:max-w-105"
            : "p-4 md:p-6 max-w-2xl lg:max-w-4xl mx-auto w-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-full bg-gray-200 rounded mb-4" />
        <div
          className={`w-full bg-gray-200 rounded-2xl ${
            compact ? "h-40" : "h-62.5"
          }`}
        />
      </div>
    );
  }

  return (
    <TaskCard
      {...cardProps}
      taskId={taskId}
      taskerName={name}
      rating={rating}
      taskerImage={avatarUrl}
      location={location}
      compact={compact}
      isLiked={isLiked}
      isSaved={isSaved}
      defaultShowComments={defaultShowComments}
    />
  );
};
