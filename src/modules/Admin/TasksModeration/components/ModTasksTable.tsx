import { Search, ChevronDown, Calendar, Download, Eye, MoreVertical, AlertTriangle } from "lucide-react";
import { cn } from "@/shared/utils";

const MOCK_TASKS = [
  { id: 'TSK-8832', name: 'Help needed with website design review', author: 'Ali Jalal', date: 'Jan 16, 2026', time: '14:23', status: 'Removed by Admin', statusColor: 'bg-status-canceled/10 text-status-canceled', flagged: true },
  { id: 'TSK-8801', name: 'Looking for graphic designer for logo', author: 'Omar Hadi', date: 'Dec 31, 2025', time: '23:59', status: 'Published by User', statusColor: 'bg-brand-purple/10 text-brand-purple', flagged: false },
  { id: 'TSK-8790', name: 'Need someone to proofread my essay', author: 'Rama Fadi', date: 'Nov 7, 2025', time: '18:45', status: 'Published by User', statusColor: 'bg-brand-purple/10 text-brand-purple', flagged: true },
  { id: 'TSK-8768', name: 'Skill exchange: Piano lessons for coding help', author: 'Tala Ali', date: 'Oct 22, 2025', time: '09:30', status: 'Published by User', statusColor: 'bg-brand-purple/10 text-brand-purple', flagged: false },
  { id: 'TSK-8400', name: 'Project collaboration: Mobile app...', author: 'Talal Radi', date: 'Sep 15, 2025', time: '12:00', status: 'Removed by Admin', statusColor: 'bg-status-canceled/10 text-status-canceled', flagged: true },
  { id: 'TSK-8364', name: 'Photography services for event coverage', author: 'Dalia Amr', date: 'Aug 4, 2025', time: '07:15', status: 'Published by User', statusColor: 'bg-brand-purple/10 text-brand-purple', flagged: false },
];

export function ModTasksTable() {
  return (
    <div className="bg-white rounded-[24px] border border-border-default/50 shadow-sm overflow-hidden">
      {/* Table Filters Header */}
      <div className="p-6 border-b border-border-default/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-third" size={18} />
            <input 
              type="text" 
              placeholder="Search for a task" 
              className="w-full h-[48px] pl-12 pr-4 bg-bg-primary/50 rounded-2xl border border-border-default/30 outline-none focus:border-brand-purple/30 text-[14px] font-[Poppins]"
            />
          </div>
          
          {/* Status Filter */}
          <button className="h-[48px] px-6 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[14px] font-medium text-text-secondary hover:bg-bg-primary/50 transition-colors">
            All status <ChevronDown size={16} />
          </button>

          {/* Date Picker Mock */}
          <button className="h-[48px] px-6 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[14px] font-medium text-text-secondary hover:bg-bg-primary/50 transition-colors">
            dd/mm/yyyy <Calendar size={16} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[14px] text-text-secondary font-medium">3 selected</span>
          <button className="h-[48px] px-8 bg-brand-purple text-white rounded-2xl flex items-center gap-2 font-bold text-[14px] shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 transition-all">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-primary/30 border-b border-border-default/20">
              <th className="px-6 py-5 w-[60px]">
                <input type="checkbox" className="w-5 h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple" />
              </th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight">Task ID <ChevronDown size={12} className="inline ml-1" /></th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight">Task Name</th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight">Posted by <ChevronDown size={12} className="inline ml-1" /></th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight">Creation Date <ChevronDown size={12} className="inline ml-1" /></th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight text-center">Status <ChevronDown size={12} className="inline ml-1" /></th>
              <th className="px-6 py-5 text-[12px] font-bold text-text-primary uppercase tracking-tight text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default/10">
            {MOCK_TASKS.map((task) => (
              <tr key={task.id} className="hover:bg-bg-primary/40 transition-all group">
                <td className="px-6 py-5">
                  <input type="checkbox" className="w-5 h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple" />
                </td>
                <td className="px-6 py-5 text-[14px] font-medium text-text-secondary">{task.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {task.flagged && <AlertTriangle size={16} className="text-status-canceled shrink-0" />}
                    <span className="text-[14px] font-bold text-[#251455] line-clamp-1">{task.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[14px] font-medium text-text-secondary whitespace-nowrap">{task.author}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text-primary">{task.date}</span>
                    <span className="text-[12px] text-text-third font-medium">{task.time}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={cn("px-5 py-2 rounded-full text-[12px] font-bold inline-block min-w-[140px]", task.statusColor)}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 transition-opacity">
                    <button className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-text-secondary hover:text-brand-purple">
                      <Eye size={20} />
                    </button>
                    <button className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-text-secondary hover:text-text-primary">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 bg-bg-primary/20 border-t border-border-default/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <span className="text-[14px] text-text-secondary font-medium">Show result:</span>
            <select className="h-[36px] min-w-[70px] px-3 bg-white rounded-xl border border-border-default/30 text-[14px] font-bold outline-none">
                <option>7</option>
                <option>10</option>
                <option>20</option>
            </select>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all">
                <ChevronDown size={20} className="rotate-90" />
            </button>
            <div className="flex items-center gap-1">
                <button className="w-10 h-10 rounded-xl bg-brand-purple text-white font-bold text-[14px] shadow-lg shadow-brand-purple/20">1</button>
                <button className="w-10 h-10 rounded-xl hover:bg-white text-text-secondary font-bold text-[14px] transition-all">2</button>
                <button className="w-10 h-10 rounded-xl hover:bg-white text-text-secondary font-bold text-[14px] transition-all">3</button>
            </div>
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                <ChevronDown size={20} className="-rotate-90" />
            </button>
        </div>
      </div>
    </div>
  );
}
