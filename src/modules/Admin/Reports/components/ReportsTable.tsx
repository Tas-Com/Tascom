import { 
  Search, 
  ChevronDown, 
  Calendar, 
  Download, 
  Eye, 
  MoreVertical,
  Flame,
  AlertCircle,
  ArrowDownCircle
} from "lucide-react";
import { cn } from "@/shared/utils";

const MOCK_REPORTS = [
  { 
    id: 'RPT-1247', 
    taskId: 'TSK-8832', 
    taskName: 'Home Repair Assistance', 
    date: 'Jan 16, 2026', 
    time: '14:23', 
    status: 'Open', 
    statusColor: 'bg-state-success/10 text-status-active',
    priority: 'High Priority',
    priorityColor: 'bg-status-canceled/10 text-status-canceled',
    priorityIcon: Flame
  },
  { 
    id: 'RPT-1246', 
    taskId: 'TSK-8801', 
    taskName: 'Emergency Plumbing Services', 
    date: 'Dec 31, 2025', 
    time: '23:59', 
    status: 'Under Review', 
    statusColor: 'bg-priority-medium-bg text-priority-medium-text',
    priority: 'Low Priority',
    priorityColor: 'bg-brand-purple/10 text-brand-purple',
    priorityIcon: ArrowDownCircle
  },
  { 
    id: 'RPT-1245', 
    taskId: 'TSK-8790', 
    taskName: 'Electrical System Upgrades', 
    date: 'Nov 7, 2025', 
    time: '18:45', 
    status: 'Under Review', 
    statusColor: 'bg-priority-medium-bg text-priority-medium-text',
    priority: 'Medium Priority',
    priorityColor: 'bg-priority-medium-bg text-priority-medium-text',
    priorityIcon: AlertCircle
  },
  { 
    id: 'RPT-1244', 
    taskId: 'TSK-8768', 
    taskName: 'Roof Repair and Maintenance', 
    date: 'Oct 22, 2025', 
    time: '09:30', 
    status: 'Resolved', 
    statusColor: 'bg-brand-purple/10 text-brand-purple',
    priority: 'High Priority',
    priorityColor: 'bg-status-canceled/10 text-status-canceled',
    priorityIcon: Flame
  },
  { 
    id: 'RPT-1243', 
    taskId: 'TSK-8400', 
    taskName: 'Interior Painting Services', 
    date: 'Sep 15, 2025', 
    time: '12:00', 
    status: 'Resolved', 
    statusColor: 'bg-brand-purple/10 text-brand-purple',
    priority: 'Low Priority',
    priorityColor: 'bg-brand-purple/10 text-brand-purple',
    priorityIcon: ArrowDownCircle
  },
  { 
    id: 'RPT-1242', 
    taskId: 'TSK-8364', 
    taskName: 'Flooring Installation and Repair', 
    date: 'Aug 4, 2025', 
    time: '07:15', 
    status: 'Open', 
    statusColor: 'bg-state-success/10 text-status-active',
    priority: 'Medium Priority',
    priorityColor: 'bg-priority-medium-bg text-priority-medium-text',
    priorityIcon: AlertCircle
  },
  { 
    id: 'RPT-1241', 
    taskId: 'TSK-8249', 
    taskName: 'HVAC System Installation', 
    date: 'Jul 19, 2025', 
    time: '16:50', 
    status: 'Under Review', 
    statusColor: 'bg-priority-medium-bg text-priority-medium-text',
    priority: 'High Priority',
    priorityColor: 'bg-status-canceled/10 text-status-canceled',
    priorityIcon: Flame
  },
];

export function ReportsTable() {
  return (
    <div className="bg-white rounded-[24px] border border-border-default/50 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Table Filters Header */}
      <div className="p-8 border-b border-border-default/20 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-[440px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-third" size={20} />
            <input 
              type="text" 
              placeholder="Search for a task" 
              className="w-full h-[56px] pl-[64px] pr-6 bg-bg-primary/30 rounded-2xl border border-border-default/30 outline-none focus:border-brand-purple/30 text-[16px] font-[Poppins] transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <button className="h-[56px] px-8 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all font-[Poppins]">
            All status <ChevronDown size={18} />
          </button>

          {/* Date Picker Mock */}
          <button className="h-[56px] px-8 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all text-text-third font-[Poppins]">
            dd/mm/yyyy <Calendar size={18} />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-[16px] text-text-secondary font-bold font-[Poppins]">3 selected</span>
          <button className="h-[56px] px-10 bg-brand-purple text-white rounded-2xl flex items-center gap-3 font-bold text-[16px] shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 active:scale-95 transition-all font-[Poppins]">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-primary/30 border-b border-border-default/20">
              <th className="px-8 py-6 w-[80px]">
                <input type="checkbox" className="w-6 h-6 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer" />
              </th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight font-[Poppins]">Report ID <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight font-[Poppins]">Task ID <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight font-[Poppins]">Task Name</th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight font-[Poppins]">Creation Date <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="px-6 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center font-[Poppins]">Status</th>
              <th className="px-6 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center font-[Poppins]">Priority</th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-right font-[Poppins]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default/10">
            {MOCK_REPORTS.map((report) => (
              <tr key={report.id} className="hover:bg-bg-primary/40 transition-all group">
                <td className="px-8 py-6">
                  <input type="checkbox" className="w-6 h-6 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer" />
                </td>
                <td className="px-8 py-6 text-[16px] font-bold text-text-secondary font-[Poppins]">{report.id}</td>
                <td className="px-8 py-6 text-[16px] font-bold text-text-secondary font-[Poppins]">{report.taskId}</td>
                <td className="px-8 py-6">
                  <span className="text-[16px] font-bold text-[#251455] font-[Poppins] line-clamp-1">{report.taskName}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-text-primary font-[Poppins]">{report.date}</span>
                    <span className="text-[14px] text-text-third font-medium font-[Poppins]">{report.time}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className={cn("px-5 py-2 rounded-full text-[13px] font-bold inline-block min-w-[120px] font-[Poppins]", report.statusColor)}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-center">
                  <div className={cn("px-4 py-2 rounded-full text-[13px] font-bold inline-flex items-center gap-2 min-w-[140px] justify-center font-[Poppins]", report.priorityColor)}>
                    <report.priorityIcon size={16} />
                    {report.priority}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 transition-opacity">
                    <button className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all text-text-secondary hover:text-brand-purple active:scale-90">
                      <Eye size={22} />
                    </button>
                    <button className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all text-text-secondary hover:text-text-primary active:scale-90">
                      <MoreVertical size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-8 bg-bg-primary/20 border-t border-border-default/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <span className="text-[16px] text-text-secondary font-bold font-[Poppins]">Show result:</span>
            <select className="h-[44px] min-w-[80px] px-4 bg-white rounded-xl border border-border-default/30 text-[16px] font-bold outline-none cursor-pointer hover:border-brand-purple/30 transition-all font-[Poppins]">
                <option>7</option>
                <option>10</option>
                <option>20</option>
            </select>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="p-3 rounded-lg hover:bg-white hover:shadow-md disabled:opacity-30 transition-all active:scale-90">
                <ChevronDown size={24} className="rotate-90" />
            </button>
            <div className="flex items-center gap-2">
                <button className="w-12 h-12 rounded-2xl bg-brand-purple text-white font-bold text-[16px] shadow-lg shadow-brand-purple/20 active:scale-95 transition-all font-[Poppins]">1</button>
                <button className="w-12 h-12 rounded-2xl hover:bg-white text-text-secondary font-bold text-[16px] transition-all hover:shadow-sm font-[Poppins]">2</button>
                <button className="w-12 h-12 rounded-2xl hover:bg-white text-text-secondary font-bold text-[16px] transition-all hover:shadow-sm font-[Poppins]">3</button>
            </div>
            <button className="p-3 rounded-lg hover:bg-white hover:shadow-md transition-all active:scale-90">
                <ChevronDown size={24} className="-rotate-90" />
            </button>
        </div>
      </div>
    </div>
  );
}
