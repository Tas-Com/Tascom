import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { TaskCard } from "@/shared/components/cards/TaskCard";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
import { toTaskCardData } from "@/modules/tasks/adapters/toTask";
import type { TaskResponse } from "@/modules/tasks/repository/TasksDtos";

export const HomePage = () => {
  const { data: tasksResponse, isLoading } = useTasks({ limit: 20, page: 1 });

  const tasks: TaskResponse[] = tasksResponse?.data || [];
  const taskCardData = tasks.map((task) => toTaskCardData(task as any));

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
                <TaskCard
                  taskerName={task.taskerName}
                  rating={task.rating}
                  taskTitle={task.taskTitle}
                  description={task.description}
                  categories={task.categories}
                  location={task.location}
                  duration={task.duration}
                  points={task.points}
                  imageUrl={task.imageUrl}
                  likes={task.likes}
                  comments={task.comments}
                  postedTime={task.postedTime}
                  taskerImage={task.taskerImage}
                  priority={task.priority}
                  taskId={task.taskId}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};
