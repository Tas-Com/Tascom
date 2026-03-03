import { Star, PartyPopper } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useTopTaskers, useTrendingCategories } from "@/modules/tasks/hooks/useTasks";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { formatCategoryName } from "@/shared/utils";

export function RightSidebar() {
  const navigate = useNavigate();
  const { data: topTaskersData } = useTopTaskers();
  const { data: trendingData } = useTrendingCategories();
  const { data: currentUser } = useCurrentUser();

  const topTaskers = topTaskersData?.data || [];
  const trendingCategories = trendingData?.data || [];

  return (
    <aside className="w-full lg:w-84 lg:mt-8 lg:mr-4 xl:mr-13 bg-secondary p-4 lg:p-0">
      <div className="bg-bg-secondary rounded-xl p-4">
        <h5 className="text-h5-1 mb-3 mt-2 text-primary">Tasks Around Me</h5>
        <div className="h-32 rounded-xl relative overflow-hidden">
          <img
            src="/map.png"
            alt="Tasks around me map"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            onClick={() => navigate({ to: "/map" })}
            className="absolute bottom-2 right-3 h-9 w-30
           bg-brand-purple text-[#FFFFFF] p-2 rounded-[103px] text-btn-s flex items-center justify-center gap-2 cursor-pointer"
          >
            view map
          </button>
        </div>
      </div>

      <div className="bg-bg-secondary rounded-xl p-4 space-y-4 mt-4">
        <h5 className="text-h5-2 text-primary mb-8">Your Stats</h5>

        <div className="flex justify-between text-body-s1 text-primary bg-primary">
          <span className="text-body1">Points</span>
          <span className="font-semibold text-brand-purple">{currentUser?.pointsBalance || 0}</span>
        </div>

        <div className="flex justify-between text-body-s2 text-primary bg-primary">
          <span>Task Completed</span>
          <span className="font-semibold">{currentUser?.ratingAvg || 0}</span>
        </div>

        <div className="flex justify-between text-body-s2 text-primary bg-primary">
          <span>Active Tasks</span>
          <span className="font-semibold">0</span>
        </div>
      </div>

      <div className="bg-bg-secondary rounded-xl p-4 space-y-5 mt-4">
        <h5 className="text-h5-2 text-primary">Top Tasker</h5>

        {topTaskers.length === 0 ? (
          <p className="text-text-secondary text-caption1">No top taskers yet</p>
        ) : (
          topTaskers.slice(0, 3).map((user: any, index: number) => (
            <div key={user.id || index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "/Ali.jpg"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://i.pravatar.cc/40";
                  }}
                />
                <div>
                  <p className="text-body1 text-primary">{user.name}</p>
                  <p className="text-caption1 text-primary">
                    <span className="text-brand-purple">
                      {user.completedTasks}
                    </span>
                    Tasks Completed
                  </p>
                </div>
              </div>
              <Star className="text-icon-star" size={30} fill="currentColor" />
            </div>
          ))
        )}
      </div>

      <div className="bg-bg-secondary rounded-xl p-4 space-y-5 mt-4">
        <h5 className="text-h5-2 text-primary">Trending Tasks</h5>
        {trendingCategories.length === 0 ? (
          <p className="text-text-secondary text-caption1">No trending tasks</p>
        ) : (
          trendingCategories.map((cat: any, index: number) => (
            <p key={index} className="text-body2 text-primary flex items-center gap-4">
              <PartyPopper className="text-brand-purple" size={20} /> {formatCategoryName(cat.category)}
            </p>
          ))
        )}
      </div>
    </aside>
  );
}
