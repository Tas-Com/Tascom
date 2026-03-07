import { useMyTasks } from "@/modules/dashboard/hooks/useDashboard";
import { RequestTaskCard } from "./RequestTaskCard";
import noSavedIcon from "@/assets/icons/noSavedIcon.png";

const RequestsPage = () => {
  const { data: myTasksData, isLoading } = useMyTasks();

  const tasks = myTasksData?.data || [];

  // Only show tasks that have pending claims (OPEN tasks with applications)
  const tasksWithClaims = tasks.filter(
    (task) =>
      task.claims &&
      task.claims.length > 0 &&
      task.claims.some((c) => c.status === "PENDING"),
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-242.5">
      <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] text-text-primary">
        Requests
      </h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
          <p className="text-text-secondary">Loading requests...</p>
        </div>
      ) : tasksWithClaims.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center py-20 gap-4">
          <img
            src={noSavedIcon}
            alt="No requests"
            className="w-25 h-auto object-contain"
          />
          <p className="font-[Poppins] font-semibold text-[24px] leading-[1.2] text-center text-text-primary">
            No requests yet.
          </p>
          <p className="font-[Poppins] font-normal text-[16px] leading-[1.4] text-center text-text-secondary max-w-100">
            You haven't received any requests yet.
            <br />
            Requests will appear here once they are submitted.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {tasksWithClaims.map((task) => (
            <RequestTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
