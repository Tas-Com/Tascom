import { MoveUpRight } from "lucide-react";
import type { Notification } from "@/shared/data/mockNotifications";

interface NotificationItemProps {
  notification: Notification;
  variant?: "dropdown" | "page";
}

export function NotificationItem({ notification, variant = "dropdown" }: NotificationItemProps) {
  return (
    <div
      className={`flex items-center gap-3 py-3 ${
        variant === "dropdown" ? "px-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0" : "border-b border-gray-100 pb-4 mb-4"
      }`}
    >
      <div className="relative">
        <img
          src={notification.userAvatar}
          alt={notification.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <p className="text-[14px] font-semibold text-[#251455] truncate">
            {notification.userName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 whitespace-nowrap">
              {notification.time}
            </span>
            {!notification.isRead && (
              <span className="w-2 h-2 bg-brand-purple rounded-full" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-[13px] text-gray-600 truncate">
            {notification.message}
          </p>
          <MoveUpRight size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
