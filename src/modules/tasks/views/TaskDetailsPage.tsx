import { useParams } from "@tanstack/react-router";
import { TaskCard } from "@/shared/components/cards/TaskCard";
import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { useTaskById } from "../hooks/useTasks";
import { toTask, toTaskCardData } from "../adapters/toTask";

export const TaskDetailsPage = () => {
  const { taskId } = useParams({ from: "/main-layout/tasks/$taskId" });
  const taskIdNum = Number(taskId);

  const { data: taskResponse, isLoading, error } = useTaskById(taskIdNum);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (error || !taskResponse) {
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

  const task = toTask(taskResponse);
  const taskCardData = toTaskCardData(task);

  return (
    <div className="flex flex-1 gap-4 lg:gap-6 p-4">
      <div className="flex-1 rounded-2xl p-4 mt-4 lg:ml-16">
        <TaskCard
          taskId={taskCardData.taskId}
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
          taskerName={taskCardData.taskerName}
          rating={taskCardData.rating}
          taskerImage={taskCardData.taskerImage}
          priority={taskCardData.priority}
          defaultShowComments={true}
        />
      </div>
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
};
