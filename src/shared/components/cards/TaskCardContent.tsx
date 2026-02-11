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
}: TaskCardContentProps) {
  const navigate = useNavigate();

  const getIcon = (cat: string) => {
    switch (cat) {
      case "Errand":
        return <ShoppingBag size={14} />;
      case "Repairs":
        return <Wrench size={14} />;
      case "Tutoring":
        return <BookOpen size={14} />;
      case "Pet Care":
        return <Heart size={14} />;
      case "Home Services":
        return <Home size={14} />;
      case "Transportation":
        return <Car size={14} />;
      default:
        return <Heart size={14} />;
    }
  };

  return (
    <div className="space-y-3">
      <h3
        className="text-h5-2 text-primary mt-8 cursor-pointer hover:text-brand-purple transition-colors"
        onClick={() => navigate({ to: "/tasks/$taskId", params: { taskId } })}
      >
        {taskTitle}
      </h3>
      <p className="text-body-s2 text-text-secondary">{description}</p>

      {/* Categories and Priority */}
      <div className="flex flex-wrap gap-3">
        {/* Categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 text-brand-purple text-text-label2 rounded-full bg-card-hover"
          >
            {getIcon(category)}
            <span>{category}</span>
          </div>
        ))}

        {/* Priority Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 text-caption1 rounded-full ${
            priority === "High"
              ? "bg-priority-high-bg text-priority-high-text"
              : priority === "Medium"
                ? "bg-priority-medium-bg text-priority-medium-text"
                : "bg-priority-low-bg text-priority-low-text"
          }`}
        >
          <Flame className="fill-current" size={20} />
          <span className="text-text-label2">{priority} Priority</span>
        </div>
      </div>

      {/* Task Details */}
      <div className="flex items-center gap-4 mt-6 mb-6 text-body-s1">
        <div className="flex items-center gap-1 text-caption2">
          <MapPin size={16} className="text-brand-purple" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 text-caption2">
          <Clock size={16} className="text-brand-purple" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="text-brand-purple" size={16} />
          <span className="text-caption2">{points}</span>
          <span className="text-caption2">points</span>
        </div>
      </div>

      {/* Task Image */}
      <div
        className="w-full h-[250px] bg-gray-200 rounded-[16px] overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          navigate({ to: "/tasks/$taskId", params: { taskId } });
        }}
        style={{ cursor: "pointer" }}
      >
        <img
          src={imageUrl}
          alt={taskTitle}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
