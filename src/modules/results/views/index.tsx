import { useState } from "react";
import { TaskCard } from "@/shared/components/cards/TaskCard";
import { PersonCard } from "@/shared/components/cards/PersonCard";
import { useSearchContext } from "@/shared/hooks/useSearchContext";
import {
  useSearchTasks,
  useSearchPeople,
} from "@/modules/tasks/hooks/useSearch";
import { toTask, toTaskCardData } from "@/modules/tasks/adapters/toTask";
import type {
  SearchTaskResult,
  SearchPersonResult,
} from "@/modules/tasks/repository/SearchDtos";

export function TopResultsPage() {
  const { searchQuery, searchType, buildSearchFilters } = useSearchContext();
  const [page, setPage] = useState(1);

  const searchFilters = buildSearchFilters(page, 10);

  const {
    data: taskData,
    isLoading: tasksLoading,
    error: tasksError,
  } = useSearchTasks(searchFilters);

  const {
    data: peopleData,
    isLoading: peopleLoading,
    error: peopleError,
  } = useSearchPeople(searchFilters);

  const isLoading = searchType === "tasks" ? tasksLoading : peopleLoading;
  const error = searchType === "tasks" ? tasksError : peopleError;
  const data = searchType === "tasks" ? taskData : peopleData;

  const tasks = (
    searchType === "tasks" ? (data?.data ?? []) : []
  ) as SearchTaskResult[];
  const people = (
    searchType === "people" ? (data?.data ?? []) : []
  ) as SearchPersonResult[];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="p-6 mt-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12">
            <p className="text-state-error mb-2">
              Failed to load search results
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-brand-purple hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = data?.meta
    ? (data.meta.totalPages ?? Math.ceil(data.meta.total / data.meta.limit))
    : 1;

  return (
    <div className="p-6 mt-4">
      <div className="max-w-3xl mx-auto">
        {searchType === "tasks" ? (
          <>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  {searchQuery
                    ? `No tasks found for "${searchQuery}"`
                    : "No tasks found matching your filters"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {tasks.map((taskResponse) => {
                  const task = toTask(taskResponse);
                  const taskCardData = toTaskCardData(task);
                  return (
                    <div key={taskResponse.id} className="flex justify-center">
                      <TaskCard
                        taskId={taskCardData.taskId}
                        creatorId={taskResponse.creatorId}
                        taskTitle={taskCardData.taskTitle}
                        description={taskCardData.description}
                        categories={taskCardData.categories}
                        location={taskCardData.location}
                        duration={taskCardData.duration}
                        points={taskCardData.points}
                        imageUrl={taskCardData.imageUrl}
                        likes={taskCardData.likes}
                        comments={taskCardData.comments}
                        postedTime={taskCardData.postedTime}
                        taskerImage={taskResponse.creator?.avatar || ""}
                        taskerName={taskResponse.creator?.name || ""}
                        rating={
                          taskResponse.creator?.ratingAvg ??
                          taskResponse.creator?.rating ??
                          0
                        }
                        priority={taskCardData.priority}
                        isLiked={taskResponse.isLiked}
                        isSaved={taskResponse.isSaved}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            {people.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  {searchQuery
                    ? `No people found for "${searchQuery}"`
                    : "No people found matching your filters"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {people.map((person) => (
                  <div key={person.id} className="flex justify-center">
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 mb-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-text-secondary">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
