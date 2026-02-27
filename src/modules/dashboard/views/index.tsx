import { useState } from "react";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { useMyTasks, useMyClaims } from "../hooks/useDashboard";
import { OverviewCard } from "../components/OverviewCard";
import { DashboardTabs } from "../components/DashboardTabs";
import { TaskListSection } from "../components/TaskListSection";

export const DashboardPage = () => {
  const { data: currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<"posted" | "claimed">("posted");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: myTasksData, isLoading: isLoadingTasks } = useMyTasks();
  const { data: myClaimsData, isLoading: isLoadingClaims } = useMyClaims();

  const myTasks = myTasksData?.data || [];
  const myClaims = myClaimsData?.data?.map((claim) => claim.task) || [];

  const filterTasks = (tasks: any[]) => {
    if (statusFilter === "All") return tasks;
    return tasks.filter((task) => {
      const status = task.status.toLowerCase().replace(/\s+/g, '-');
      const filter = statusFilter.toLowerCase().replace(/\s+/g, '-');
      return status === filter;
    });
  };

  const displayedTasks = filterTasks(myTasks);
  const displayedClaims = filterTasks(myClaims);

  return (
    <div className="flex flex-col gap-5 xl:gap-6 w-full max-w-[970px] p-4 sm:p-6 lg:p-0">
      <h1 className="font-[Poppins] font-semibold text-[24px] sm:text-[28px] xl:text-[32px] leading-[1.2] text-(--colors-Text-primary,#251455)">
        Dashboard
      </h1>

      <OverviewCard
        points={currentUser?.pointsBalance || 0}
        posts={myTasks.length}
        claimed={myClaims.length}
        completed={myTasks.filter((t) => t.status === "completed").length + myClaims.filter((t) => t.status === "completed").length}
      />

      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "posted" ? (
        <TaskListSection
          title="Your Tasks"
          tasks={displayedTasks}
          isLoading={isLoadingTasks}
          isEmpty={displayedTasks.length === 0}
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      ) : (
        <TaskListSection
          title="Claimed Tasks"
          tasks={displayedClaims}
          isLoading={isLoadingClaims}
          isEmpty={displayedClaims.length === 0}
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      )}
    </div>
  );
};
