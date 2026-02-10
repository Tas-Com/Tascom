import { Star, Bookmark, MoreVertical } from "lucide-react";

interface TaskCardHeaderProps {
  taskerName: string;
  rating: number;
  postedTime: string;
  taskerImage: string;
}

export function TaskCardHeader({
  taskerName,
  rating,
  postedTime,
  taskerImage,
}: TaskCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={taskerImage}
          alt={taskerName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-primary">{taskerName}</p>
            <Star className="text-icon-star fill-current" size={18} />
            <span className="text-btn-s  text-icon-star">{rating}</span>
          </div>
          <p className="text-sm text-text-secondary">{postedTime}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Bookmark className="text-icon-default fill-current" size={25} />
        <MoreVertical className="text-icon-default fill-current" size={25} />
      </div>
    </div>
  );
}
