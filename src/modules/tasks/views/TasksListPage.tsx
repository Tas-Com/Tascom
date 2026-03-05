import { useState } from "react";
import { TaskCardWithCreator } from "@/shared/components/cards/TaskCardWithCreator";
import { useTasks } from "../hooks/useTasks";
import { toTask, toTaskCardData } from "../adapters/toTask";
import type { TaskFilters } from "../repository/TasksDtos";

export const TasksListPage = () => {
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useTasks(filters);
  console.log(data, "REAL");

  const tasks = data?.data || [];

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <p className="text-state-error mb-2">Failed to load tasks</p>
          <button
            onClick={() => window.location.reload()}
            className="text-brand-purple hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-11 mt-4 lg:mt-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">No tasks found</p>
            </div>
          ) : (
            tasks.map((taskResponse) => {
              const task = toTask(taskResponse);
              const taskCardData = toTaskCardData(task);
              return (
                <div key={taskResponse.id} className="flex justify-center">
                  <TaskCardWithCreator
                    taskId={taskCardData.taskId}
                    creatorId={String(taskResponse.creatorId)}
                    fallbackName={taskResponse.creator?.name}
                    fallbackRating={
                      taskResponse.creator?.ratingAvg ??
                      taskResponse.creator?.rating
                    }
                    location={taskCardData.location}
                    taskTitle={taskCardData.taskTitle}
                    description={taskCardData.description}
                    categories={taskCardData.categories}
                    duration={taskCardData.duration}
                    points={taskCardData.points}
                    imageUrl={taskCardData.imageUrl}
                    likes={taskCardData.likes}
                    comments={taskCardData.comments}
                    postedTime={taskCardData.postedTime}
                    priority={taskCardData.priority}
                    isLiked={taskCardData.isLiked}
                    isSaved={taskCardData.isSaved}
                  />
                </div>
              );
            })
          )}
        </div>

        {data?.meta && data.meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(filters.page! - 1)}
              disabled={filters.page === 1}
              className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-text-secondary">
              Page {filters.page} of {data.meta.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(filters.page! + 1)}
              disabled={filters.page === data.meta.totalPages}
              className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
