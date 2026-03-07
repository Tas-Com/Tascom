import { useNavigate } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Zap,
  Flame,
  Wrench,
  Car,
  BookOpen,
  Heart,
  Home,
  ShoppingBag,
} from "lucide-react";
import { formatCategoryName } from "@/shared/utils";

interface TaskCardContentProps {
  taskTitle: string;
  description: string;
  categories: string[];
  location: string;
  duration: string;
  points: number;
  imageUrl: string;
  priority: string;
  taskId: string;
  compact?: boolean;
}

export function TaskCardContent({
  taskTitle,
  description,
  categories,
  location,
  duration,
  points,
  imageUrl,
  priority,
  taskId,
  compact = false,
}: TaskCardContentProps) {
  const navigate = useNavigate();

  const iconSize = compact ? 12 : 14;
  const getIcon = (cat: string) => {
    switch (cat) {
      case "Errands":
        return <ShoppingBag size={iconSize} />;
      case "Repairs":
        return <Wrench size={iconSize} />;
      case "Tutoring":
        return <BookOpen size={iconSize} />;
      case "PetCare":
      case "Pet Care":
        return <Heart size={iconSize} />;
      case "HomeServices":
      case "Home Services":
        return <Home size={iconSize} />;
      case "Transportation":
        return <Car size={iconSize} />;
      default:
        return <Heart size={iconSize} />;
    }
  };

  const getDisplayCategory = (cat: string): string => {
    return formatCategoryName(cat);
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <h3
        className={`text-primary cursor-pointer hover:text-brand-purple transition-colors ${
          compact ? "text-body-s2 font-semibold mt-4" : "text-h5-2 mt-8"
        }`}
        onClick={() => navigate({ to: "/tasks/$taskId", params: { taskId } })}
      >
        {taskTitle}
      </h3>
      <p
        className={`text-text-secondary ${compact ? "text-label2 line-clamp-2" : "text-body-s2"}`}
      >
        {description}
      </p>

      {/* Categories and Priority */}
      <div className="flex flex-wrap gap-2">
        {/* Categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-brand-purple rounded-full"
            style={{
              background: "#F4F0FF",
              minWidth: 99,
              height: 32,
              borderRadius: 50,
              paddingTop: 4,
              paddingRight: 16,
              paddingBottom: 4,
              paddingLeft: 16,
            }}
          >
            {getIcon(category)}
            <span className="text-sm font-medium whitespace-nowrap">
              {getDisplayCategory(category)}
            </span>
          </div>
        ))}

        {/* Priority Badge */}
        <div
          className={`flex items-center gap-1.5 rounded-full ${
            compact
              ? "px-2 py-0.5 text-label2"
              : "px-3 py-1 gap-2 text-caption1"
          } ${
            priority === "High" || priority === "HIGH"
              ? "bg-priority-high-bg text-priority-high-text"
              : priority === "Medium" || priority === "MEDIUM"
                ? "bg-priority-medium-bg text-priority-medium-text"
                : "bg-priority-low-bg text-priority-low-text"
          }`}
        >
          <Flame className="fill-current" size={compact ? 14 : 20} />
          <span className={compact ? "text-label2" : "text-text-label2"}>
            {priority} Priority
          </span>
        </div>
      </div>

      {/* Task Details */}
      <div
        className={`flex items-center gap-4 text-body-s1 ${compact ? "mt-3 mb-3" : "mt-6 mb-6"}`}
      >
        <div
          className={`flex items-center gap-1 ${compact ? "text-label2" : "text-caption2"}`}
        >
          <MapPin size={compact ? 14 : 16} className="text-brand-purple" />
          <span>{location}</span>
        </div>
        <div
          className={`flex items-center gap-1 ${compact ? "text-label2" : "text-caption2"}`}
        >
          <Clock size={compact ? 14 : 16} className="text-brand-purple" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="text-brand-purple" size={compact ? 14 : 16} />
          <span className={compact ? "text-label2" : "text-caption2"}>
            {points}
          </span>
          <span className={compact ? "text-label2" : "text-caption2"}>
            points
          </span>
        </div>
      </div>

      {/* Task Image */}
      <div
        className={`w-full bg-gray-200 rounded-2xl overflow-hidden ${compact ? "h-40" : "h-62.5"}`}
        onClick={(e) => {
          e.stopPropagation();
          navigate({ to: "/tasks/$taskId", params: { taskId } });
        }}
        style={{ cursor: "pointer" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={taskTitle}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/cat.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-text-secondary">No image</span>
          </div>
        )}
      </div>
    </div>
  );
}
