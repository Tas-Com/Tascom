import { Star, Bookmark, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ReportTaskModal } from "../common/ReportTaskModal";

interface TaskCardHeaderProps {
  taskerName: string;
  rating: number;
  postedTime: string;
  taskerImage: string;
<<<<<<< HEAD
  taskId: string;
=======
  compact?: boolean;
>>>>>>> 8c62f03a53037178e5c74bda89ccbc0ba5496b6d
}

export function TaskCardHeader({
  taskerName,
  rating,
  postedTime,
  taskerImage,
<<<<<<< HEAD
  taskId,
=======
  compact = false,
>>>>>>> 8c62f03a53037178e5c74bda89ccbc0ba5496b6d
}: TaskCardHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center gap-3">
        <img
          src={taskerImage}
          alt={taskerName}
          className={`rounded-full object-cover ${compact ? "w-8 h-8" : "w-10 h-10"}`}
        />
        <div>
          <div className="flex items-center gap-1">
<<<<<<< HEAD
            <p className="font-semibold text-primary">{taskerName}</p>
            <Star className="text-icon-star fill-current" size={18} />
            <span className="text-btn-s text-icon-star">{rating}</span>
=======
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
>>>>>>> 8c62f03a53037178e5c74bda89ccbc0ba5496b6d
          </div>
          <p
            className={`text-text-secondary ${compact ? "text-xs" : "text-sm"}`}
          >
            {postedTime}
          </p>
        </div>
      </div>
<<<<<<< HEAD

      {/* Right actions */}
      <div className="flex items-center gap-2 relative">
        <Bookmark className="text-icon-default fill-current" size={25} />
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
=======
      <div className="flex items-center gap-2">
        <Bookmark
          className="text-icon-default fill-current"
          size={compact ? 20 : 25}
        />
        <MoreVertical
          className="text-icon-default fill-current"
          size={compact ? 20 : 25}
>>>>>>> 8c62f03a53037178e5c74bda89ccbc0ba5496b6d
        />
      </div>
    </div>
  );
}
