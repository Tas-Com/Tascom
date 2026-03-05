import { MapPin, Send, MoreVertical } from "lucide-react";
import type { User } from "@/modules/Auth/dto/AuthDto";

interface ProfileHeroProps {
  user: User;
  showAcceptButton?: boolean;
}

export function ProfileHero({ user, showAcceptButton }: ProfileHeroProps) {
  return (
    <div className="flex items-center justify-between w-full bg-white p-6 rounded-t-2xl">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
            alt={user.name}
            className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-bold text-[#251455]">{user.name}</h2>
          <div className="flex items-center gap-2 bg-[#F3F0FF] px-3 py-1 rounded-full w-fit">
            <MapPin size={14} fill="#6B39F4" className="text-white" />
            <span className="text-[12px] font-semibold text-[#6B39F4]">{user.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-11 h-11 flex items-center justify-center bg-[#6B39F4] text-white rounded-full hover:bg-[#5a2ed1] transition-colors shadow-sm">
          <Send size={18} fill="white" className="-rotate-12 ml-[1px] mt-[-1px]" />
        </button>
        {showAcceptButton && (
          <button className="h-11 px-8 bg-[#6B39F4] text-white rounded-2xl font-semibold text-[15px] hover:bg-[#5a2ed1] transition-colors shadow-sm">
            Accept helper
          </button>
        )}
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
}
