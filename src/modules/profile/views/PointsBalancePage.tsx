import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  Pencil,
  ChevronDown,
  ChevronUp,
  MapPin,
  Zap,
  ClipboardList,
  Wrench,
  GraduationCap,
  Heart,
  Home,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  useMyTasks,
  useMyClaims,
} from "@/modules/dashboard/hooks/useDashboard";
import { OverviewCard } from "@/modules/dashboard/components/OverviewCard";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import type { Task } from "@/modules/dashboard/repository/DashboardDtos";

type PointsFilter = "All" | "Completed" | "Cancelled";
const FILTER_OPTIONS: PointsFilter[] = ["All", "Completed", "Cancelled"];

interface PointEntry {
  id: string;
  task: Task;
  status: "COMPLETED" | "CANCELLED";
  points: number;
  date: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Errands":
      return <ClipboardList size={14} />;
    case "Repairs":
      return <Wrench size={14} />;
    case "Tutoring":
      return <GraduationCap size={14} />;
    case "PetCare":
      return <Heart size={14} />;
    case "HomeServices":
      return <Home size={14} />;
    case "Transportation":
      return <Car size={14} />;
    default:
      return <ClipboardList size={14} />;
  }
};

const formatCategoryLabel = (category: string) =>
  category.replace(/([A-Z])/g, " $1").trim();

const formatEntryDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (isToday) return `Today, ${time}`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString())
    return `Yesterday, ${time}`;
  return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${time}`;
};

const LocationTag = ({ lat, lng }: { lat: number; lng: number }) => {
  const { locationName } = useReverseGeocode(lat, lng);
  if (!locationName) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F0FF] text-brand-purple rounded-full text-xs font-medium">
      <MapPin size={14} />
      {locationName}
    </span>
  );
};

const PointEntryCard = ({ entry }: { entry: PointEntry }) => {
  const isCompleted = entry.status === "COMPLETED";

  return (
    <div
      className="flex items-center gap-4 w-full rounded-2xl bg-white p-6"
      style={{ boxShadow: "0px 2px 20px 0px #0000001A" }}
    >
      {/* Status icon */}
      <div
        className={cn(
          "shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
          isCompleted ? "bg-[#F0FDF4]" : "bg-[#FEF2F2]",
        )}
      >
        {isCompleted ? (
          <ArrowUpRight size={20} className="text-green-600" />
        ) : (
          <Pencil size={20} className="text-red-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1 min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          {/* Title + Date */}
          <div>
            <h3 className="font-[Poppins] font-semibold text-lg leading-tight text-(--colors-Text-primary,#251455) truncate">
              {entry.task.title}
            </h3>
            <p className="font-[Poppins] text-sm text-(--colors-Text-third,#6E6E6E) mt-0.5">
              {formatEntryDate(entry.date)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F0FF] text-brand-purple rounded-full text-xs font-medium">
              {getCategoryIcon(entry.task.category)}
              {formatCategoryLabel(entry.task.category)}
            </span>
            <LocationTag lat={entry.task.latitude} lng={entry.task.longitude} />
          </div>
        </div>

        {/* Right side: status badge + points */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
              isCompleted
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500",
            )}
          >
            {isCompleted ? "Completed" : "Cancelled"}
          </span>
          <span
            className={cn(
              "flex items-center gap-1 font-[Poppins] font-semibold text-sm",
              isCompleted ? "text-green-600" : "text-red-500",
            )}
          >
            <Zap size={14} />
            {isCompleted ? "+" : ""}
            {entry.points} points
          </span>
        </div>
      </div>
    </div>
  );
};

const PointsBalancePage = () => {
  const [filter, setFilter] = useState<PointsFilter>("All");
  const [isOpen, setIsOpen] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { data: myTasksData } = useMyTasks();
  const { data: myClaimsData } = useMyClaims();

  const myTasks = myTasksData?.data || [];
  const myClaimsRaw = myClaimsData?.data || [];
  const myClaims = myClaimsRaw.map((claim) => claim.task);

  const pointEntries = useMemo<PointEntry[]>(() => {
    const entries: PointEntry[] = [];

    // From my posted tasks: completed tasks earned me points
    myTasks.forEach((task) => {
      const status = (task.status || "").toUpperCase().trim();
      if (status === "COMPLETED") {
        entries.push({
          id: `task-${task.id}-completed`,
          task,
          status: "COMPLETED",
          points: task.pointsOffered,
          date: task.completedAt || task.updatedAt,
        });
      }
    });

    // From my claims: completed claims earned me points, cancelled lost points
    const claimsData = myClaimsRaw;
    claimsData.forEach((claim) => {
      const taskStatus = (claim.task.status || "").toUpperCase().trim();
      const claimStatus = (claim.status || "").toUpperCase().trim();

      if (taskStatus === "COMPLETED" || claimStatus === "COMPLETED") {
        entries.push({
          id: `claim-${claim.id}-completed`,
          task: claim.task,
          status: "COMPLETED",
          points: claim.task.pointsOffered,
          date: claim.task.completedAt || claim.task.updatedAt,
        });
      } else if (
        claimStatus === "CANCELLED" ||
        claimStatus === "REJECTED" ||
        taskStatus === "CANCELLED"
      ) {
        entries.push({
          id: `claim-${claim.id}-cancelled`,
          task: claim.task,
          status: "CANCELLED",
          points: -claim.task.pointsOffered,
          date: claim.task.updatedAt,
        });
      }
    });

    // Sort by date descending
    entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return entries;
  }, [myTasks, myClaimsRaw]);

  const filteredEntries = useMemo(() => {
    if (filter === "All") return pointEntries;
    return pointEntries.filter((e) => e.status === filter.toUpperCase());
  }, [pointEntries, filter]);

  const isEmpty = filteredEntries.length === 0;

  return (
    <div className="flex flex-col gap-5 xl:gap-6 w-full max-w-242.5 p-4 sm:p-6 lg:p-0">
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

      {/* Points Balance container */}
      <div
        className="w-full bg-white rounded-2xl p-6 flex flex-col gap-4"
        style={{ boxShadow: "0px 2px 20px 0px #0000001A" }}
      >
        {/* Header with title + filter */}
        <div className="flex items-center justify-between">
          <h2 className="font-[Poppins] font-semibold text-[18px] sm:text-[22px] xl:text-[24px] leading-[1.2] text-(--colors-Text-primary,#251455)">
            Points Balance
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-1 sm:px-4 sm:py-1.5 border rounded-lg transition-all min-w-25 sm:min-w-30",
                isOpen
                  ? "border-brand-purple text-brand-purple shadow-sm ring-1 ring-brand-purple"
                  : "border-[#E8E8EC] text-[#6E6E6E]",
              )}
            >
              <span className="font-[Poppins] text-[12px] sm:text-[13px] font-medium">
                {filter}
              </span>
              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-full bg-white border border-[#E8E8EC] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilter(option);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-[12px] sm:text-[13px] font-[Poppins] transition-colors hover:bg-gray-50",
                      filter === option
                        ? "text-brand-purple font-semibold bg-purple-50/50"
                        : "text-[#6E6E6E]",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-3">
            <Zap size={80} className="text-brand-purple/20" strokeWidth={1.5} />
            <p className="font-[Poppins] font-semibold text-[18px] sm:text-[20px] text-center text-(--colors-Text-primary,#251455)">
              No points activity yet.
            </p>
            <p className="font-[Poppins] text-[14px] sm:text-[16px] text-center text-(--colors-Text-third,#6E6E6E)">
              Complete tasks to start earning points.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredEntries.map((entry) => (
              <PointEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsBalancePage;
