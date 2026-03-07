import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import noSavedIcon from "@/assets/icons/noSavedIcon.png";
import { DashboardTaskCard } from "./DashboardTaskCard";
import type { Task } from "../repository/DashboardDtos";
import { cn } from "@/lib/utils";

interface ClaimInfo {
  id: string;
  status: string;
  claimantId: string;
}

interface TaskListSectionProps {
  title: string;
  tasks: Task[];
  isLoading: boolean;
  isEmpty: boolean;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  mode: "posted" | "claimed";
  claimInfoMap?: Record<string, ClaimInfo>;
  onRemoveTask?: (taskId: number) => void;
  onCancelTask?: (claimId: number) => void;
  onMarkDone?: (taskId: number) => void;
}

const FILTER_OPTIONS = [
  "All",
  "Active",
  "On Progress",
  "Completed",
  "Cancelled",
];

export const TaskListSection = ({
  title,
  tasks,
  isLoading,
  isEmpty,
  currentFilter,
  onFilterChange,
  mode,
  claimInfoMap,
  onRemoveTask,
  onCancelTask,
  onMarkDone,
}: TaskListSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-242.5 bg-white rounded-2xl p-4 sm:p-6 xl:p-8 mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="font-[Poppins] font-semibold text-[18px] sm:text-[22px] xl:text-[24px] leading-[1.2] text-(--colors-Text-primary,#251455)">
          {title}
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
              {currentFilter}
            </span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-full bg-white border border-[#E8E8EC] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onFilterChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-[12px] sm:text-[13px] font-[Poppins] transition-colors hover:bg-gray-50",
                    currentFilter === option
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

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-24 gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--colors-brand-purple,#6B39F4)"></div>
          <p className="text-(--colors-Text-third,#6E6E6E)">Loading tasks...</p>
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 gap-4">
          <img
            src={noSavedIcon}
            alt="No active tasks"
            className="w-20 sm:w-25 h-auto object-contain"
          />
          <p className="font-[Poppins] font-semibold text-[18px] sm:text-[24px] leading-[1.2] text-center text-(--colors-Text-primary,#251455)">
            You have no active tasks yet.
          </p>
          <p className="font-[Poppins] font-normal text-[14px] sm:text-[18px] leading-[1.4] text-center text-(--colors-Text-third,#6E6E6E) max-w-100">
            Post a task or help others in your community to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {tasks.map((task) => (
            <DashboardTaskCard
              key={task.id}
              task={task}
              mode={mode}
              claimInfo={claimInfoMap?.[task.id]}
              onRemoveTask={onRemoveTask}
              onCancelTask={onCancelTask}
              onMarkDone={onMarkDone}
            />
          ))}
        </div>
      )}
    </div>
  );
};
