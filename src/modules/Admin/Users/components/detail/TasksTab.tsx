import { ChevronDown, Ban, Trash2 } from "lucide-react";
import { cn } from "@/shared/utils";

const MOCK_TASKS = [
  { id: 1, name: 'Pet Sitting for a Day', status: 'Active', date: 'Posted 1 days ago', canSuspend: true, canRemove: true },
  { id: 2, name: 'Ride Needed Within the City', status: 'In progress', date: 'Posted 2 days ago', canSuspend: true, canRemove: true },
  { id: 3, name: 'Organizing a Small Space', status: 'Completed', date: 'Posted 3 months ago' },
  { id: 4, name: 'Fix a Broken Door', status: 'Canceled', date: 'Canceled date: 25/12/2025' },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Active': return "bg-state-success/10 text-status-active";
    case 'In progress': return "bg-priority-medium-bg text-priority-medium-text";
    case 'Completed': return "bg-brand-purple/10 text-brand-purple";
    case 'Canceled': return "bg-status-canceled/10 text-status-canceled";
    default: return "bg-bg-primary text-text-secondary";
  }
};

export function TasksTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-bold text-[#251455]">Tasks</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-default/30 text-[14px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all font-[Poppins]">
          All <ChevronDown size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_TASKS.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-[24px] border border-border-default/20 hover:shadow-md transition-all group flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={cn("px-4 py-1 rounded-full text-[12px] font-bold", getStatusStyles(task.status))}>
                  {task.status}
                </span>
                <span className="text-[14px] text-text-third font-medium italic">{task.date}</span>
              </div>
              <div className="flex items-center gap-3">
                {task.canSuspend && (
                  <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-border-default/30 text-text-secondary font-bold text-[13px] hover:bg-bg-primary/50 transition-all active:scale-95">
                    <Ban size={16} />
                    Suspend
                  </button>
                )}
                {task.canRemove && (
                  <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-status-canceled/30 text-status-canceled font-bold text-[13px] hover:bg-status-canceled hover:text-white transition-all active:scale-95">
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>
            </div>
            <h4 className="text-[18px] font-bold text-[#251455]">{task.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
