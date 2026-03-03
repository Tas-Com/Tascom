import { Star } from "lucide-react";
import type { TaskActivity } from "../data/mockUserProfile";

interface ActivitySectionProps {
  title: string;
  tasks: TaskActivity[];
  type: "posted" | "recent";
}

export function ActivitySection({ title, tasks, type }: ActivitySectionProps) {
  return (
    <div className="bg-[#F9F9F9] rounded-2xl p-8 flex flex-col gap-6 flex-1 min-w-[300px]">
      <h3 className="text-[20px] font-bold text-[#251455]">{title}</h3>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-[#6B39F4] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <img
                src={task.image}
                alt={task.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-semibold text-[#251455]">
                  {task.title}
                </h4>
                {type === "posted" ? (
                  <button className="text-[12px] text-[#6B39F4] font-medium hover:underline text-left">
                    View Task Details
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#FFB800" className="text-[#FFB800]" />
                    <span className="text-[12px] font-bold text-[#FFB800]">{task.rating}</span>
                    <span className="text-[12px] text-gray-400 italic">"{task.comment}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
