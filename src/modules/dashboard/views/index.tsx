import { useState } from "react";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import {
  useMyTasks,
  useMyClaims,
  useRemoveTask,
  useMarkTaskDone,
  useCancelTaskClaim,
} from "../hooks/useDashboard";
import { OverviewCard } from "../components/OverviewCard";
import { DashboardTabs } from "../components/DashboardTabs";
import { TaskListSection } from "../components/TaskListSection";

export const DashboardPage = () => {
  const { data: currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<"posted" | "claimed">("posted");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: myTasksData, isLoading: isLoadingTasks } = useMyTasks();
  const { data: myClaimsData, isLoading: isLoadingClaims } = useMyClaims();

  const removeTask = useRemoveTask();
  const markDone = useMarkTaskDone();
  const cancelClaim = useCancelTaskClaim();

  const myTasks = myTasksData?.data || [];
  const myClaimsRaw = myClaimsData?.data || [];
  const myClaims = myClaimsRaw.map((claim) => claim.task);

  // Build a map of taskId -> claim info for claimed tasks
  const claimInfoMap: Record<
    string,
    { id: string; status: string; claimantId: string }
  > = {};
  myClaimsRaw.forEach((claim) => {
    claimInfoMap[claim.task.id] = {
      id: claim.id,
      status: claim.status,
      claimantId: claim.claimantId,
    };
  });

  // For posted tasks with IN_PROGRESS, find the accepted claim to use for cancel
  const postedClaimInfoMap: Record<
    string,
    { id: string; status: string; claimantId: string }
  > = {};
  myTasks.forEach((task) => {
    const acceptedClaim = task.claims?.find(
      (c) => (c.status || "").toUpperCase() === "ACCEPTED",
    );
    if (acceptedClaim) {
      postedClaimInfoMap[task.id] = {
        id: acceptedClaim.id,
        status: acceptedClaim.status,
        claimantId: acceptedClaim.claimantId,
      };
    }
  });

  const filterTasks = (tasks: any[], useClaimStatus = false) => {
    if (statusFilter === "All") return tasks;
    const filterMap: Record<string, string> = {
      Active: "OPEN",
      "On Progress": "IN_PROGRESS",
      Completed: "COMPLETED",
      Cancelled: "CANCELLED",
    };
    const mappedStatus = filterMap[statusFilter];
    if (!mappedStatus) return tasks;
    return tasks.filter((task) => {
      if (useClaimStatus) {
        const claimSt = (claimInfoMap[task.id]?.status || "")
          .toUpperCase()
          .trim();
        const effective =
          claimSt === "PENDING"
            ? "OPEN"
            : claimSt === "ACCEPTED"
              ? "IN_PROGRESS"
              : claimSt === "CANCELLED" || claimSt === "REJECTED"
                ? "CANCELLED"
                : (task.status || "").toUpperCase().trim();
        return effective === mappedStatus;
      }
      return (task.status || "").toUpperCase().trim() === mappedStatus;
    });
  };

  const displayedTasks = filterTasks(myTasks);
  const displayedClaims = filterTasks(myClaims, true);

  const handleRemoveTask = (taskId: number) => {
    return removeTask.mutateAsync(taskId);
  };

  const handleCancelTask = (claimId: number) => {
    return cancelClaim.mutateAsync(claimId);
  };

  const handleMarkDone = (taskId: number) => {
    return markDone.mutateAsync(taskId);
  };

  return (
    <div className="flex flex-col gap-5 xl:gap-6 w-full max-w-[970px] p-4 sm:p-6 lg:p-0">
      <h1 className="font-[Poppins] font-semibold text-[24px] sm:text-[28px] xl:text-[32px] leading-[1.2] text-(--colors-Text-primary,#251455)">
        Dashboard
      </h1>

      <OverviewCard
        points={currentUser?.pointsBalance || 0}
        posts={myTasks.length}
        claimed={myClaims.length}
        completed={
          myTasks.filter((t) => t.status === "COMPLETED").length +
          myClaims.filter((t) => t.status === "COMPLETED").length
        }
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
          mode="posted"
          claimInfoMap={postedClaimInfoMap}
          onRemoveTask={handleRemoveTask}
          onCancelTask={handleCancelTask}
          onMarkDone={handleMarkDone}
        />
      ) : (
        <TaskListSection
          title="Your Tasks"
          tasks={displayedClaims}
          isLoading={isLoadingClaims}
          isEmpty={displayedClaims.length === 0}
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
          mode="claimed"
          claimInfoMap={claimInfoMap}
          onCancelTask={handleCancelTask}
          onMarkDone={handleMarkDone}
        />
      )}
    </div>
  );
};
