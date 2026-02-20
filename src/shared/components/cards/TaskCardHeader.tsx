import { Star, Bookmark, MoreVertical } from "lucide-react";

interface TaskCardHeaderProps {
  taskerName: string;
  rating: number;
  postedTime: string;
  taskerImage: string;
  compact?: boolean;
}

export function TaskCardHeader({
  taskerName,
  rating,
  postedTime,
  taskerImage,
  compact = false,
}: TaskCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={taskerImage}
          alt={taskerName}
          className={`rounded-full object-cover ${compact ? "w-8 h-8" : "w-10 h-10"}`}
        />
        <div>
          <div className="flex items-center gap-1">
            <p
              className={`font-semibold text-primary ${compact ? "text-sm" : ""}`}
            >
              {taskerName}
            </p>
            <Star
              className="text-icon-star fill-current"
              size={compact ? 14 : 18}
            />
            <span
              className={`text-icon-star ${compact ? "text-xs" : "text-btn-s"}`}
            >
              {rating}
            </span>
          </div>
          <p
            className={`text-text-secondary ${compact ? "text-xs" : "text-sm"}`}
          >
            {postedTime}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Bookmark
          className="text-icon-default fill-current"
          size={compact ? 20 : 25}
        />
        <MoreVertical
          className="text-icon-default fill-current"
          size={compact ? 20 : 25}
        />
      </div>
    </div>
  );
}
