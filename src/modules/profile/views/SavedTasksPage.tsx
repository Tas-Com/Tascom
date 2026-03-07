import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SavedTaskCard } from "../components/SavedTaskCard";
import { useSavedTasks, useSaveTask } from "@/modules/tasks/hooks/useTasks";
import { toTask, toTaskCardData } from "@/modules/tasks/adapters/toTask";
import type { SavedTasksResponse } from "@/modules/tasks/repository/TasksDtos";
import { useSavesStore } from "@/store/savesStore";
import { toast } from "sonner";
import noSavedIcon from "@/assets/icons/noSavedIcon.png";

const SavedTasksPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSavedTasks();
  const saveTask = useSaveTask();
  const { syncFromApi, removeSaved } = useSavesStore();
  const savedTasks = data?.data ?? [];
  const isEmpty = savedTasks.length === 0;

  // Sync saves store with API data so other pages see correct bookmark state
  useEffect(() => {
    if (data?.data) {
      syncFromApi(data.data.map((t) => String(t.id)));
    }
  }, [data, syncFromApi]);

  const handleUnsave = async (taskId: string) => {
    const taskIdNum = Number(taskId);

    // Optimistically remove from store + cache
    removeSaved(taskId);
    const previousData = queryClient.getQueryData<SavedTasksResponse>([
      "saved-tasks",
    ]);
    queryClient.setQueryData<SavedTasksResponse>(["saved-tasks"], (old) => {
      if (!old) return old;
      return {
        ...old,
        data: old.data.filter((t) => String(t.id) !== taskId),
      };
    });

    try {
      await saveTask.mutateAsync(taskIdNum);
      toast.success("Task removed from saved");
    } catch {
      // Revert on failure
      if (previousData) {
        queryClient.setQueryData(["saved-tasks"], previousData);
      }
      // Re-add to store
      useSavesStore.getState().setSaved(taskId);
      toast.error("Failed to remove task");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[970px]">
        <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] tracking-normal text-(--colors-Text-primary,#251455)">
          Saved Tasks
        </h1>
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[970px]">
        <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] tracking-normal text-(--colors-Text-primary,#251455)">
          Saved Tasks
        </h1>
        <div className="flex items-center justify-center py-24">
          <p className="text-state-error">Failed to load saved tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[970px]">
      <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] tracking-normal text-(--colors-Text-primary,#251455)">
        Saved Tasks
      </h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <img
            src={noSavedIcon}
            alt="No saved tasks"
            className="w-24 h-24 object-contain"
          />
          <p className="font-[Poppins] font-semibold text-[20px] leading-[1.2] text-center text-(--colors-Text-primary,#251455)">
            No saved tasks yet.
          </p>
          <p className="font-[Poppins] font-normal text-[18px] leading-[1.4] text-center text-(--colors-Text-Secondary,#6E6E6E)">
            You haven't saved any tasks yet.
            <br />
            Save tasks to easily find and review them later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {savedTasks.map((taskResponse) => {
            const task = toTask(taskResponse);
            const cardData = toTaskCardData(task);
            return (
              <SavedTaskCard
                key={taskResponse.id}
                task={{
                  id: cardData.taskId,
                  creatorId: String(taskResponse.creatorId),
                  postedTime: cardData.postedTime,
                  taskTitle: cardData.taskTitle,
                  description: cardData.description,
                  imageUrl: cardData.imageUrl,
                }}
                onUnsave={handleUnsave}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedTasksPage;
