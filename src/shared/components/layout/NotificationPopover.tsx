import { Ban, UserPlus } from "lucide-react";
import { cn } from "@/shared/utils";

const NOTIFICATIONS = [
  { 
    id: 1, 
    text: "Omar Reported to Task #TSK-88..", 
    time: "2 minutes ago", 
    icon: Ban, 
    iconBg: "bg-status-canceled/10", 
    iconColor: "text-status-canceled" 
  },
  { 
    id: 2, 
    text: "5 new users registered", 
    time: "5 minutes ago", 
    icon: UserPlus, 
    iconBg: "bg-brand-purple/10", 
    iconColor: "text-brand-purple" 
  },
  { 
    id: 3, 
    text: "Ali Reported to Task #TSK-88..", 
    time: "8 minutes ago", 
    icon: Ban, 
    iconBg: "bg-status-canceled/10", 
    iconColor: "text-status-canceled" 
  },
  { 
    id: 4, 
    text: "Waleed Reported to Task #TSK-..", 
    time: "20 minutes ago", 
    icon: Ban, 
    iconBg: "bg-status-canceled/10", 
    iconColor: "text-status-canceled" 
  },
];

export function NotificationPopover() {
  return (
    <div className="absolute top-[90px] right-0 w-[420px] bg-white rounded-[28px] shadow-[0px_24px_48px_rgba(0,0,0,0.12)] border border-border-default/20 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="p-8 pb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-[#251455] font-[Poppins]">notifications</h3>
        <button className="text-[12px] font-bold text-text-third hover:text-brand-purple transition-colors">View All</button>
      </div>

      <div className="py-2">
        {NOTIFICATIONS.map((notif) => (
          <div 
            key={notif.id} 
            className="px-8 py-5 flex items-center gap-4 hover:bg-bg-primary/30 cursor-pointer transition-colors group"
          >
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", notif.iconBg, notif.iconColor)}>
              <notif.icon size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[14px] font-bold text-[#251455] truncate group-hover:text-brand-purple transition-colors">
                {notif.text}
              </p>
              <p className="text-[12px] text-text-third font-medium italic">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-bg-primary/10 border-t border-border-default/10 text-center">
        <button className="text-[12px] font-bold text-brand-purple hover:underline">Mark all as read</button>
      </div>
    </div>
  );
}
