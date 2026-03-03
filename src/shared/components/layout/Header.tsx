import { Bell, MessagesSquare, Home } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { NotificationDropdown } from "@/modules/notifications/components/NotificationDropdown";
import { mockNotifications } from "@/shared/data/mockNotifications";

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

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  // Close dropdown on route change
  useEffect(() => {
    setIsNotificationOpen(false);
  }, [location.pathname]);

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
            className={`cursor-pointer transition-colors ${isHomePage && !isNotificationOpen ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
              }`}
          />
        </Link>

        <div className="relative">
          <Bell
            size={30}
            className={`cursor-pointer transition-colors ${isNotificationOpen || (isNotificationsPage && !isNotificationOpen) ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsNotificationOpen(!isNotificationOpen);
            }}
          />
          {unreadCount > 0 && !isNotificationOpen && !isNotificationsPage && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-purple rounded-full border-2 border-white" />
          )}
          {isNotificationOpen && (
            <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
          )}
        </div>

        <Link to="/chat">
          <MessagesSquare
            size={30}
            className={`cursor-pointer transition-colors ${isChatPage && !isNotificationOpen ? "text-[#251455] fill-[#251455]" : "text-primary hover:text-[#251455]"
              }`}
          />
        </Link>

        <Link to="/profile">
          <img
            src={userAvatar || "/Grouph.png"}
            alt={userName || "User"}
            className={`w-9 h-9 mr-4 cursor-pointer rounded-full object-cover
          ${isProfilePage && !isNotificationOpen ? "border-2 border-brand-purple" : "border-2 border-transparent"}
        `}
          />
        </Link>
      </div>
    </header>
  );
}
