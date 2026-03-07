import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Bookmark } from "lucide-react";
import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import userDefaultImg from "@/assets/user.jpg";

export interface SavedTaskData {
  id: string;
  creatorId: string;
  postedTime: string;
  taskTitle: string;
  description: string;
  imageUrl: string;
}

interface SavedTaskCardProps {
  task: SavedTaskData;
  onUnsave: (id: string) => void;
}

export function SavedTaskCard({ task, onUnsave }: SavedTaskCardProps) {
  const navigate = useNavigate();
  const { data: creator } = useUserById(task.creatorId);

  const rawAvatar = creator?.assets?.find((a: any) => !a.taskId)?.url ?? "";
  const avatarUrl = rawAvatar === "null" ? "" : rawAvatar;
  const name = creator?.name ?? "Unknown";
  const rating = creator?.ratingAvg ?? 0;

  const handleProfileClick = () => {
    navigate({ to: `/user-profile/${task.creatorId}` });
  };

  return (
    <div
      className="flex gap-6 w-full rounded-2xl p-4 border border-border-post bg-white"
      style={{ minHeight: 255, maxHeight: 255 }}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleProfileClick}
          >
            <img
              src={avatarUrl || userDefaultImg}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = userDefaultImg;
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-[Poppins] font-semibold text-sm text-text-primary hover:text-brand-purple transition-colors">
                  {name}
                </span>
                <span className="flex items-center gap-0.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-amber-500 font-medium">{rating}</span>
                </span>
              </div>
              <span className="text-xs text-text-secondary">
                {task.postedTime}
              </span>
            </div>
          </div>
          <button
            className="ml-auto cursor-pointer focus:outline-none"
            onClick={() => onUnsave(task.id)}
          >
            <Bookmark className="w-5 h-5 text-primary fill-current" />
          </button>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">
          <img
            src={task.imageUrl}
            alt={task.taskTitle}
            className="w-40 h-37.5 rounded-xl object-cover shrink-0"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-between min-w-0 flex-1">
            <div>
              <h3 className="font-[Poppins] font-semibold text-base text-text-primary mb-1 truncate">
                {task.taskTitle}
              </h3>
              <p className="font-[Poppins] text-sm text-text-secondary leading-relaxed line-clamp-4">
                {task.description}
              </p>
            </div>
            <Link
              to="/tasks/$taskId"
              params={{ taskId: task.id }}
              className="self-end text-sm font-[Poppins] font-medium text-brand-purple hover:underline mt-2"
            >
              See more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
