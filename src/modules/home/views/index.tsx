import { RightSidebar } from "@/shared/components/layout/RightSidebar";
import { TaskCard } from "@/shared/components/cards/TaskCard";
import { mockTasks } from "@/shared/data/mockTasks";

export const HomePage = () => {
  return (
    <div className="flex flex-1 gap-6 p-4">
      <div className="flex-1 rounded-[16px] p-4 mt-9">
        <div className="space-y-6">
          {mockTasks.map((task) => (
            <div key={task.id} className="flex justify-center">
              <TaskCard
                key={task.id}
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
          ))}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};
