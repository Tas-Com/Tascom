import {
  Search,
  Bell,
  MessageSquare,
  Sparkles,
  Home,
  ChevronDown,
} from "lucide-react";

type HeaderProps = {
  userName: string;
  userAvatar?: string;
  logoSrc?: string;
};

export function Header({ userName }: HeaderProps) {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <img src="/Grouph 2.png" alt="logo" className="w-64.78px h-44px" />
        <img src="/Tascom.png" alt="Tascom" className="h-44px w-144px" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white px-4 py-2 rounded-2xl border border-[#DEDEDE]">
          <Search className="text-primary mr-2 h-24px w-24px" size={30} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full"
          />
          <Sparkles className="text-primary ml-2" size={30} />
          <div className="w-px h-7 bg-gray-300 mx-2"></div>
          <button className="text-body-s1 text-primary ml-2 flex items-center gap-1">
            Tasks
            <ChevronDown size={20} />
          </button>
        </div>
        <Home size={20} className="text-primary" />
        <Bell size={20} className="text-primary" />
        <MessageSquare size={20} className="text-primary" />

        {/* api imag */}
        <img src="Grouph.png" alt={userName} className="w-9 h-9 mr-5" />
      </div>
    </header>
  );
}
