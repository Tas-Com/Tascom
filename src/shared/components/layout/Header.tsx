import { Bell, MessageSquare, Home } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/SearchInput";

type HeaderProps = {
  userName: string;
  userAvatar?: string;
  logoSrc?: string;
};

export function Header({ userName }: HeaderProps) {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-9">
      <div className="flex items-center gap-2 ml-7">
        <img src="/Grouph 2.png" alt="logo" className="w-64.78px h-44px" />
        <img src="/Tascom.png" alt="Tascom" className="h-44px w-144px" />
      </div>

      <div className="flex items-center gap-4">
        <SearchInput />
        <Home size={30} className="text-primary" />
        <Bell size={30} className="text-primary" />
        <MessageSquare size={30} className="text-primary" />

        {/* api imag */}
        <img src="Grouph.png" alt={userName} className="w-9 h-9 mr-4" />
      </div>
    </header>
  );
}
