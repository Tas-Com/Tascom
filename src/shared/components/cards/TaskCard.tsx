import { useState } from "react";
import {
  Bookmark,
  MoreVertical,
  Star,
  Heart,
  MapPin,
  Clock,
  Zap,
  Flame,
  MessageCircle,
  Forward,
  Wrench,
  Car,
  BookOpen,
  Home,
  ShoppingBag,
} from "lucide-react";
import { mockCommentsByTask } from "@/shared/data/mockComments";

type TaskCardProps = {
  taskerName: string;
  rating: number;
  taskTitle: string;
  description: string;
  categories: string[];
  location: string;
  duration: string;
  points: number;
  imageUrl: string;
  likes: number;
  comments: number;
  postedTime: string;
  taskerImage: string;
  priority: string;
  taskId: string;
};

export function TaskCard({
  taskerName,
  rating,
  taskTitle,
  description,
  categories,
  location,
  duration,
  points,
  imageUrl,
  likes,
  comments,
  postedTime,
  taskerImage,
  priority,
  taskId,
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(true);
  return (
    <div className="bg-white rounded-[16px] p-6 space-y-4 w-full max-w-[700px] shadow-sm border border-gray-100">
      {/* Tasker Info */}
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

      {/* Task Content */}
      <div className="space-y-3">
        <h3 className="text-h5-2 text-primary mt-8">{taskTitle}</h3>
        <p className="text-body-s2 text-text-secondary">{description}</p>

        {/* Categories and Priority */}
        <div className="flex flex-wrap gap-3">
          {/* Categories */}
          {categories.map((category, index) => {
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
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 text-brand-purple text-text-label2 rounded-full bg-card-hover"
              >
                {getIcon(category)}
                <span>{category}</span>
              </div>
            );
          })}

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
        <div className="w-[650px] h-[250px] bg-gray-200 rounded-[16px] overflow-hidden">
          <img
            src={imageUrl}
            alt={taskTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Interaction Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors">
              <Heart size={20} className="text-icon-liked fill-current" />
              <span>{likes}</span>
            </button>
            <button
              className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle
                size={20}
                className="text-icon-default cursor-pointer"
              />
              <span>{comments}</span>
            </button>
            <button className="flex items-center gap-2 text-caption2 hover:text-brand-purple transition-colors">
              <Forward size={25} className="text-icon-default" />
            </button>
          </div>
          <button className="bg-brand-purple text-btn-s text-white px-6 py-2 rounded-[103px]">
            Claim Task
          </button>
        </div>
      </div>

      {showComments && (
        <div className="pt-4 space-y-3 ">
          <div className="flex items-center justify-between text-body-s1 mb-8">
            <span>Comments ({comments})</span>
            <select className="bg-primary rounded-[40px] outline-none text-primary font-medium">
              <option>All</option>
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {mockCommentsByTask[taskId]?.map((comment) => (
              <div
                key={comment.id}
                className={`flex gap-3 ${comment.replyTo ? "ml-8" : ""}`}
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {comment.author}
                      </span>
                      <span className="text-text-secondary text-label2 mt-0.5">
                        {comment.time}
                      </span>
                    </div>
                    <button className="text-text-caption2 hover:text-brand-purple">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <p className="text-label2 text-text-primary mt-1">
                    {comment.content}
                  </p>
                  <button
                    className="text-label1 font-medium text-text-primary mt-2 bg-bg-primary rounded-[40px] 
                  pt-[8px] pr-[12px] pb-[8px] pl-[12px] flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button className="text-brand-purple hover:text-purple-600">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
