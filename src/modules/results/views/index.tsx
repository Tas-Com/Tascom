import { TaskCard } from "@/shared/components/cards/TaskCard";
import { useSearchContext } from "@/shared/contexts/SearchContext";

export function TopResultsPage() {
  const { filteredTasks } = useSearchContext();

  return (
    <div className="p-11 mt-18">
      <div className="max-w-6xl mx-auto">
        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex justify-center">
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
          ))}
        </div>
      </div>
    </div>
  );
}
