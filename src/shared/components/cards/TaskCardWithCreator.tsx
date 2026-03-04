import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import { TaskCard } from "./TaskCard";

interface TaskCardWithCreatorProps {
    taskId: string;
    creatorId: string;
    fallbackName?: string;
    fallbackRating?: number;
    latitude?: number | null;
    longitude?: number | null;
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
}
export const TaskCardWithCreator = ({
    taskId,
    creatorId,
    fallbackName = "Unknown",
    fallbackRating = 0,
    latitude,
    longitude,
    ...cardProps
}: TaskCardWithCreatorProps) => {
    const { data: creator } = useUserById(creatorId);
    const { locationName } = useReverseGeocode(latitude, longitude);

    const rawAvatar =
        creator?.assets?.find((a) => !a.taskId)?.url ??
        creator?.assets?.[0]?.url ??
        "";
    const avatarUrl = rawAvatar === "null" ? "" : rawAvatar;

    const name = creator?.name ?? fallbackName;
    const rating = creator?.ratingAvg ?? fallbackRating;

    return (
        <TaskCard
            {...cardProps}
            taskId={taskId}
            taskerName={name}
            rating={rating}
            taskerImage={avatarUrl}
            location={locationName}
        />
    );
};
