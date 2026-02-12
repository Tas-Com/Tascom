import { useState } from "react";
import { Bell, MessageSquare, Home, LogOut } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { tokenManager } from "@/shared/api/client";
import { useNavigate } from "@tanstack/react-router";

type HeaderProps = {
  userName: string;
  userAvatar?: string;
  logoSrc?: string;
};

export function Header({ userName }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    tokenManager.removeToken();
    navigate({ to: "/login" });
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-9">
      <div className="flex items-center gap-2 ml-7">
        <img src="/Grouph 2.png" alt="logo" className="w-64.78px h-44px" />
        <img src="/Tascom.png" alt="Tascom" className="h-44px w-144px" />
      </div>

      <div className="flex items-center gap-4">
        <SearchInput />
        <Home size={30} className="text-primary cursor-pointer" />
        <Bell size={30} className="text-primary cursor-pointer" />
        <MessageSquare size={30} className="text-primary cursor-pointer" />

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <img
              src="Grouph.png"
              alt={userName}
              className="w-9 h-9 mr-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-4 top-12 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-state-error hover:bg-state-error/5 flex items-center gap-2 transition-colors font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
