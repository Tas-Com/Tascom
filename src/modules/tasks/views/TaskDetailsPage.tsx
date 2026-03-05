import { useParams } from "@tanstack/react-router";
import { TaskCardWithCreator } from "@/shared/components/cards/TaskCardWithCreator";
import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import { useTaskById } from "../hooks/useTasks";
import { toTask, toTaskCardData } from "../adapters/toTask";

export const TaskDetailsPage = () => {
  const { taskId } = useParams({ from: "/main-layout/tasks/$taskId" });
  const taskIdNum = Number(taskId);

  const { data: taskResponse, isLoading, error } = useTaskById(taskIdNum);

  const task = taskResponse ? toTask(taskResponse) : null;
  const { locationName } = useReverseGeocode(
    task?.latitude ?? null,
    task?.longitude ?? null,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <p className="text-state-error mb-2">Failed to load task</p>
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

  const taskCardData = toTaskCardData(task);

  return (
    <div className="flex flex-1 gap-4 lg:gap-6 p-4">
      <div className="flex-1 rounded-2xl p-4 mt-4 lg:ml-16">
        <TaskCardWithCreator
          taskId={taskCardData.taskId}
          creatorId={String(task.creatorId)}
          fallbackName={task.creator?.name}
          fallbackRating={task.creator?.ratingAvg ?? task.creator?.rating}
          location={locationName}
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
          defaultShowComments={true}
        />
      </div>
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
};
