import { Package, Hammer, Car, Music } from "lucide-react";
import type { NewPublishedTask } from "../repository/DashboardDtos";

interface RecentTasksProps {
  tasks?: NewPublishedTask[];
  isLoading?: boolean;
}

const getTaskIconAndColor = (category?: string) => {
  if (!category) return { icon: Music, color: 'text-status-active bg-status-active/10' };
  
  switch (category.toLowerCase()) {
    case 'errands':
    case 'homeservices':
        return { icon: Package, color: 'text-brand-purple bg-brand-purple/10' };
    case 'repairs':
        return { icon: Hammer, color: 'text-status-completed bg-status-completed/10' };
    case 'transportation':
        return { icon: Car, color: 'text-status-in-progress bg-status-in-progress/10' };
    default:
        return { icon: Music, color: 'text-status-active bg-status-active/10' };
  }
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
};

export function RecentTasks({ tasks = [], isLoading }: RecentTasksProps) {
  return (
    <div className="bg-white p-6 rounded-[20px] border border-border-default/50 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[18px] font-bold text-text-primary">New Published Task</h3>
        <button className="text-[12px] font-semibold text-brand-purple hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {isLoading ? (
            <div className="text-center py-4 text-text-secondary animate-pulse">Loading tasks...</div>
        ) : tasks.length === 0 ? (
            <div className="text-center py-4 text-text-secondary">No tasks found.</div>
        ) : tasks.map((task) => {
          const { icon: Icon, color } = getTaskIconAndColor(task.category);
          return (
            <div key={task.id} className="flex items-start gap-4 group cursor-pointer">
              <div className={`p-3 rounded-2xl ${color} shrink-0`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-text-primary truncate">{task.title}</h4>
                <p className="text-[12px] text-text-secondary">By {task.creatorName}</p>
              </div>
              <span className="text-[11px] text-text-third whitespace-nowrap">{formatTime(task.createdAt)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
