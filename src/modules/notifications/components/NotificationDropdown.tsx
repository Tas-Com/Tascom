import { Link } from "@tanstack/react-router";
import { mockNotifications } from "@/shared/data/mockNotifications";
import { NotificationItem } from "./NotificationItem";
import { EmptyState } from "@/shared/components/ui/EmptyState";

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  // Show only first 4 notification for dropdown
  const dropdownNotifications = mockNotifications.slice(0, 4);
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div 
      className="w-[263px] bg-white rounded-[8px] shadow-lg border border-gray-200 p-[16px] flex flex-col gap-[20px] sm:w-[300px] md:w-[263px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-medium text-[#251455]">notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-brand-purple text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-gray-500 text-[12px] hover:text-brand-purple transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-col min-h-[100px] justify-center">
        {dropdownNotifications.length > 0 ? (
          dropdownNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              variant="dropdown"
            />
          ))
        ) : (
          <EmptyState 
            imageSrc="/empty-notifications.png" 
            message="No notifications"
            imageClassName="w-[100px]"
            className="py-4"
          />
        )}
      </div>
    </div>
  );
}
