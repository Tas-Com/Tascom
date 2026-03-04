import { useEffect, useRef, useCallback } from "react";
import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { TaskCardWithCreator } from "@/shared/components/cards/TaskCardWithCreator";
import { useInfiniteTasksQuery } from "@/modules/tasks/hooks/useTasks";
import { toTask, toTaskCardData } from "@/modules/tasks/adapters/toTask";
import type { TaskResponse } from "@/modules/tasks/repository/TasksDtos";

export const HomePage = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteTasksQuery(undefined, 20);

  const allTasks: TaskResponse[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  const taskCardData = allTasks.map((task) => ({
    ...toTaskCardData(toTask(task)),
    creatorId: task.creatorId,
    latitude: task.latitude,
    longitude: task.longitude,
    fallbackName: task.creator?.name,
    fallbackRating: task.creator?.ratingAvg ?? task.creator?.rating,
  }));

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect]);

  if (isLoading) {
    return (
      <div className="flex flex-1 gap-6 p-4">
        <div className="flex-1 rounded-2xl p-4 mt-9">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
          </div>
        </div>
        <RightSidebar />
      </div>
    );
  }

  return (
    <div className="flex flex-1 gap-4 md:gap-6 p-4">
      <div className="flex-1 rounded-2xl p-4 mt-4 md:mt-9">
        <div className="space-y-6">
          {taskCardData.length === 0 ? (
            <div className="text-center py-10 text-text-secondary">
              No tasks available at the moment
            </div>
          ) : (
            taskCardData.map((task) => (
              <div key={task.taskId} className="flex justify-center">
                <TaskCardWithCreator
                  taskId={task.taskId}
                  creatorId={task.creatorId}
                  fallbackName={task.fallbackName}
                  fallbackRating={task.fallbackRating}
                  latitude={task.latitude}
                  longitude={task.longitude}
                  taskTitle={task.taskTitle}
                  description={task.description}
                  categories={task.categories}
                  duration={task.duration}
                  points={task.points}
                  imageUrl={task.imageUrl}
                  likes={task.likes}
                  comments={task.comments}
                  postedTime={task.postedTime}
                  priority={task.priority}
                />
              </div>
            ))
          )}

          <div ref={sentinelRef} className="h-4" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple" />
            </div>
          )}

          {!hasNextPage && taskCardData.length > 0 && (
            <p className="text-center text-sm text-text-secondary py-4">
              You&apos;ve seen all tasks
            </p>
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};
