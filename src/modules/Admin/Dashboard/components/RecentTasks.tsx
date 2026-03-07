import { Package, Hammer, Car, Music } from "lucide-react";

const RECENT_TASKS = [
  { id: 1, title: 'Moved 1-bedroom apartment', author: 'Samir Ali', time: 'just now', icon: Package, color: 'text-brand-purple bg-brand-purple/10' },
  { id: 2, title: 'Moved 1-bedroom apartment', author: 'Omer Milly', time: '3m ago', icon: Hammer, color: 'text-status-completed bg-status-completed/10' },
  { id: 3, title: 'Moved 1-bedroom apartment', author: 'Khaled Ahmad', time: '4m ago', icon: Car, color: 'text-status-in-progress bg-status-in-progress/10' },
  { id: 4, title: 'Moved 1-bedroom apartment', author: 'Ali Aga', time: '1h ago', icon: Music, color: 'text-status-active bg-status-active/10' },
];

export function RecentTasks() {
  return (
    <div className="bg-white p-6 rounded-[20px] border border-border-default/50 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[18px] font-bold text-text-primary">New Published Task</h3>
        <button className="text-[12px] font-semibold text-brand-purple hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {RECENT_TASKS.map((task) => (
          <div key={task.id} className="flex items-start gap-4 group cursor-pointer">
            <div className={`p-3 rounded-2xl ${task.color} shrink-0`}>
              <task.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold text-text-primary truncate">{task.title}</h4>
              <p className="text-[12px] text-text-secondary">By {task.author}</p>
            </div>
            <span className="text-[11px] text-text-third whitespace-nowrap">{task.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
