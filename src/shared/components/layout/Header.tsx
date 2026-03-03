import { Bell, MessagesSquare, Home } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { NotificationDropdown } from "@/modules/notifications/components/NotificationDropdown";
import { mockNotifications } from "@/shared/data/mockNotifications";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

type HeaderProps = {
  userName: string;
  userAvatar?: string;
  logoSrc?: string;
};

export function Header({ userName, userAvatar }: HeaderProps) {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");
  const isHomePage = location.pathname === "/";
  const isNotificationsPage = location.pathname === "/notifications";
  const isChatPage = location.pathname === "/chat";

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 bg-white flex items-center justify-between px-9 z-[100] relative">
      <div className="flex items-center gap-2 ml-7">
        <img src="/Grouph 2.png" alt="logo" className="w-64.78px h-44px" />
        <img src="/Tascom.png" alt="Tascom" className="h-44px w-144px" />
      </div>

      <div className="flex items-center gap-4">
        <SearchInput />
        <Link to="/">
          <Home
            size={25}
            className={`cursor-pointer transition-colors ${isHomePage && !isOpen ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
              }`}
          />
        </Link>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Bell
                size={30}
                className={`cursor-pointer transition-colors ${isOpen || (isNotificationsPage && !isOpen) ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
                  }`}
              />
              {unreadCount > 0 && !isOpen && !isNotificationsPage && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-purple rounded-full border-2 border-white" />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[263px] p-0 border-none shadow-none bg-transparent" align="end" sideOffset={12}>
            <NotificationDropdown onClose={() => setIsOpen(false)} />
          </PopoverContent>
        </Popover>

        <Link to="/chat">
          <MessagesSquare
            size={30}
            className={`cursor-pointer transition-colors ${isChatPage && !isOpen ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
              }`}
          />
        </Link>

        <Link to="/profile">
          <img
            src={userAvatar || "/Grouph.png"}
            alt={userName || "User"}
            className={`w-9 h-9 mr-4 cursor-pointer rounded-full object-cover
          ${isProfilePage && !isOpen ? "border-2 border-brand-purple" : "border-2 border-transparent"}
        `}
          />
        </Link>
      </div>
    </header>
  );
}
