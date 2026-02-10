import { useParams } from "@tanstack/react-router";
import { TaskCard } from "@/shared/components/cards/TaskCard";
import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { mockTasks } from "@/shared/data/mockTasks";

export const TaskDetailsPage = () => {
  const { taskId } = useParams({ from: "/main-layout/tasks/$taskId" });

  const task = mockTasks.find((t) => t.id === taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex flex-1 gap-6 p-4">
      <div className="flex-1 rounded-[16px] p-4 mt-5 ml-65">
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
          taskId={task.id}
        />
      </div>
      <RightSidebar />
    </div>
  );
};
