import { ChevronDown, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/shared/utils";

const MOCK_DISPUTES = [
  { 
    id: 1, 
    title: 'Incomplete Delivery - Task #4829', 
    reporter: 'Samar Saleh', 
    date: 'Nov 02, 2025', 
    reportId: 'RPT-2025-89', 
    status: 'Action Required',
    statusColor: 'bg-status-canceled/10 text-status-canceled',
    description: 'I am writing to report that Samir Ali marked the assigned errands as completed, however the errands were not fulfilled as requested.',
    canAction: true
  },
  { 
    id: 2, 
    title: 'Harassment Report - Comment Section', 
    reporter: 'Anas Rashed', 
    date: 'May 09, 2025', 
    reportId: 'RPT-2025-70', 
    status: 'Resolved',
    statusColor: 'bg-state-success/10 text-status-active',
    description: 'I reported inappropriate language in the comment section. The user appealed, claiming the context was misunderstood. The admin review upheld the report but reduced the penalty to a warning.',
    canAction: false
  },
];

export function ReportsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-bold text-[#251455]">Disputes</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-default/30 text-[14px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all font-[Poppins]">
          All <ChevronDown size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_DISPUTES.map((dispute) => (
          <div key={dispute.id} className="bg-white p-8 rounded-[24px] border border-border-default/20 hover:shadow-md transition-all flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  dispute.canAction ? "bg-status-canceled/10 text-status-canceled" : "bg-state-success/10 text-status-active"
                )}>
                  {dispute.canAction ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[18px] font-bold text-[#251455]">{dispute.title}</h4>
                  <p className="text-[12px] text-text-third font-medium italic">
                    Reported by <span className="font-bold text-text-secondary">{dispute.reporter}</span> • {dispute.date} • ID: #{dispute.reportId}
                  </p>
                </div>
              </div>
              <span className={cn("px-4 py-1 rounded-full text-[12px] font-bold", dispute.statusColor)}>
                {dispute.status}
              </span>
            </div>

            <div className="bg-bg-primary/30 p-4 rounded-2xl">
              <p className="text-[14px] text-text-secondary leading-relaxed font-medium">
                {dispute.description}
              </p>
            </div>

            {dispute.canAction && (
              <div className="flex items-center justify-end gap-3">
                <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl border border-status-canceled/30 text-status-canceled font-bold text-[14px] hover:bg-status-canceled hover:text-white transition-all active:scale-95">
                  <Trash2 size={18} />
                  Remove Task
                </button>
                <button className="flex items-center gap-2 px-10 py-2.5 rounded-xl bg-brand-purple text-white font-bold text-[14px] shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 transition-all active:scale-95">
                  <CheckCircle2 size={18} />
                  Resolved
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
