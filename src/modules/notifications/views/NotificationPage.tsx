import { NotificationItem } from "../components/NotificationItem";
import { mockNotifications } from "@/shared/data/mockNotifications";
import { EmptyState } from "@/shared/components/ui/EmptyState";

export default function NotificationPage() {
  // Group notifications by date
  const groupedNotifications = mockNotifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {} as Record<string, typeof mockNotifications>);

  const dates = Object.keys(groupedNotifications);

  return (
    <div className="flex flex-1 gap-6 px-20 py-4">
      <div className="flex-1 bg-white rounded-2xl p-8 mt-9 min-h-[600px] flex flex-col">
        <h1 className="text-[40px] font-bold text-[#251455] mb-8">Notifications</h1>

        {dates.length > 0 ? (
          <div className="space-y-10">
            {dates.map((date) => (
              <div key={date}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                  <h2 className="text-[20px] font-bold text-[#251455]">{date}</h2>
                  <span className="text-[12px] text-gray-400">24 Dec</span>
                </div>
                <div className="space-y-4">
                  {groupedNotifications[date].map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      variant="page"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              imageSrc="/empty-notifications.png" 
              message="You don't have any notifications yet"
              imageClassName="w-[300px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
