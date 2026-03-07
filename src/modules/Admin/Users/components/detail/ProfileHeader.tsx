import { Ban } from "lucide-react";
import { cn } from "@/shared/utils";

interface ProfileHeaderProps {
  name: string;
  avatar: string;
  status: string;
}

export function ProfileHeader({ name, avatar, status }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name} 
            className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name='+name+'&background=random'; }}
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-state-success rounded-full border-2 border-white"></div>
        </div>
        <div className="space-y-1">
          <h2 className="text-[32px] font-bold text-[#251455] tracking-tight">{name}</h2>
          <span className={cn(
            "px-3 py-1 rounded-full text-[12px] font-bold inline-block",
            status === 'Active' ? "bg-state-success/10 text-status-active" : "bg-status-canceled/10 text-status-canceled"
          )}>
            {status}
          </span>
        </div>
      </div>
      <button className="flex items-center gap-2 px-10 py-3 rounded-full border border-status-canceled text-status-canceled font-bold text-[14px] hover:bg-status-canceled hover:text-white transition-all active:scale-95">
        <Ban size={18} />
        Ban
      </button>
    </div>
  );
}
