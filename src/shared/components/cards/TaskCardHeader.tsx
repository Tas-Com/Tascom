import { Star, Bookmark, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ReportTaskModal } from "../common/ReportTaskModal";
import userDefaultImg from "@/assets/user.jpg";

interface TaskCardHeaderProps {
  taskerName: string;
  rating: number;
  postedTime: string;
  taskId: string;
  creatorId?: string;
  taskerImage: string;
  compact?: boolean;
  isSaved?: boolean;
  onSave?: () => void;
}

export function TaskCardHeader({
  taskerName,
  rating,
  postedTime,
  taskerImage,
  compact = false,
  taskId,
  creatorId,
  isSaved = false,
  onSave,
}: TaskCardHeaderProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    if (creatorId) {
      navigate({ to: `/user-profile/${creatorId}` });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between relative">
      <div
        className={`flex items-center gap-3 ${creatorId ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
        onClick={handleProfileClick}
      >
        <img
          src={taskerImage || userDefaultImg}
          alt={taskerName}
          className={`rounded-full object-cover ${compact ? "w-8 h-8" : "w-10 h-10"}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = userDefaultImg;
          }}
        />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-primary hover:text-brand-purple transition-colors">
              {taskerName}
            </p>
            <Star className="text-icon-star fill-current" size={18} />
            <span className="text-btn-s text-icon-star">{rating}</span>
          </div>
          <p
            className={`text-text-secondary ${compact ? "text-xs" : "text-sm"}`}
          >
            {postedTime}
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 relative">
        <button onClick={onSave} className="cursor-pointer focus:outline-none">
          <Bookmark
            className={
              isSaved ? "text-primary fill-current" : "text-icon-default"
            }
            size={25}
          />
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-icon-default"
        >
          <MoreVertical size={25} />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md z-50 border border-gray-200"
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setShowReportModal(true);
                setShowMenu(false);
              }}
            >
              Report Task
            </button>
          </div>
        )}

        {/* Report Modal */}
        <ReportTaskModal
          taskId={taskId}
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
      </div>
    </div>
  );
}
