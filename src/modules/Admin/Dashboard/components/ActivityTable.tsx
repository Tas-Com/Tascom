import { Eye, MoreVertical } from "lucide-react";
import { cn } from "@/shared/utils";

const ACTIVITY_DATA = [
  { id: 'RPT-1247', name: 'Home Repair Assistance', status: 'Open', color: 'bg-state-success/10 text-status-active' },
  { id: 'RPT-1246', name: 'Emergency Plumbing Services', status: 'Under Review', color: 'bg-priority-medium-bg text-priority-medium-text' },
  { id: 'RPT-1245', name: 'Electrical System Upgrades', status: 'Open', color: 'bg-state-success/10 text-status-active' },
  { id: 'RPT-1244', name: 'Roof Repair and Maintenance', status: 'Resolved', color: 'bg-status-completed/10 text-status-completed' },
];

export function ActivityTable() {
  return (
    <div className="bg-white rounded-[20px] border border-border-default/50 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border-default/30 flex justify-between items-center">
        <h3 className="text-[18px] font-bold text-text-primary">Last Reports</h3>
        <button className="text-[12px] text-text-secondary hover:text-brand-purple flex items-center gap-1 transition-colors">
          Today <MoreVertical size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-default/20">
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded border-border-default text-brand-purple focus:ring-brand-purple" />
              </th>
              <th className="px-6 py-4 text-[12px] text-text-secondary font-semibold uppercase tracking-wider">Report ID</th>
              <th className="px-6 py-4 text-[12px] text-text-secondary font-semibold uppercase tracking-wider">Task Name</th>
              <th className="px-6 py-4 text-[12px] text-text-secondary font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] text-text-secondary font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default/10">
            {ACTIVITY_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-bg-primary/50 transition-all group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-border-default text-brand-purple focus:ring-brand-purple" />
                </td>
                <td className="px-6 py-4 text-[14px] font-medium text-text-secondary">{item.id}</td>
                <td className="px-6 py-4 text-[14px] font-semibold text-text-primary">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={cn("px-4 py-1.5 rounded-full text-[12px] font-bold text-center inline-block min-w-[100px]", item.color)}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-bg-card-hover rounded-full transition-colors text-text-secondary hover:text-brand-purple" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-bg-card-hover rounded-full transition-colors text-text-secondary hover:text-text-primary">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
