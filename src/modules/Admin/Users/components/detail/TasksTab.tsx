import { ChevronDown, Ban, Trash2 } from "lucide-react";
import { cn } from "@/shared/utils";
import { useAdminUserTasks } from "../../hooks/useAdminUsers";

interface TasksTabProps {
  userId: string;
}

const getStatusStyles = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('active')) return "bg-state-success/10 text-status-active";
  if (s.includes('progress')) return "bg-priority-medium-bg text-priority-medium-text";
  if (s.includes('completed')) return "bg-brand-purple/10 text-brand-purple";
  if (s.includes('canceled')) return "bg-status-canceled/10 text-status-canceled";
  return "bg-bg-primary text-text-secondary";
};

export function TasksTab({ userId }: TasksTabProps) {
  const { data: tasks, isLoading } = useAdminUserTasks(userId);

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-text-secondary font-bold">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-bold text-[#251455]">Tasks</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-default/30 text-[14px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all font-[Poppins]">
          All <ChevronDown size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {!tasks || tasks.length === 0 ? (
          <div className="bg-white p-12 rounded-[24px] border border-border-default/20 text-center text-text-third font-medium italic">
            No tasks found for this user.
          </div>
        ) : tasks.map((task: any) => (
          <div key={task.id} className="bg-white p-6 rounded-[24px] border border-border-default/20 hover:shadow-md transition-all group flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={cn("px-4 py-1 rounded-full text-[12px] font-bold", getStatusStyles(task.status || 'Active'))}>
                  {task.status || 'Active'}
                </span>
                <span className="text-[14px] text-text-third font-medium italic">
                  {task.createdAt ? `Posted ${new Date(task.createdAt).toLocaleDateString()}` : 'Posted recently'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-border-default/30 text-text-secondary font-bold text-[13px] hover:bg-bg-primary/50 transition-all active:scale-95">
                  <Ban size={16} />
                  Suspend
                </button>
                <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-status-canceled/30 text-status-canceled font-bold text-[13px] hover:bg-status-canceled hover:text-white transition-all active:scale-95">
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
            <h4 className="text-[18px] font-bold text-[#251455]">{task.title || task.name || 'Untitled Task'}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
