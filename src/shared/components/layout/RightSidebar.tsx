import StarIcon from "@mui/icons-material/Star";

type TopTasker = {
  id: number;
  name: string;
  tasksCompleted: number;
};

const mockTopTaskers: TopTasker[] = [
  { id: 1, name: "Ali Ahmad", tasksCompleted: 122 },
  { id: 2, name: "Adam Kamil", tasksCompleted: 105 },
  { id: 3, name: "Ayan Maly", tasksCompleted: 89 },
];

export function RightSidebar() {
  return (
    <aside className="w-72 space-y-6">
      <div className="bg-bg-secondary rounded-xl p-4">
        <h5 className="text-h5-2 mb-3">Tasks Around Me</h5>
        <div className="h-32 bg-gray-200 rounded-lg relative">
          <button className="absolute bottom-3 right-3 bg-brand-purple text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
            view map
          </button>
        </div>
      </div>

      <div className="bg-bg-secondary rounded-xl p-4 space-y-3">
        <h5 className="text-h5-2">Your Stats</h5>

        <div className="flex justify-between text-body-s1">
          <span>Points</span>
          <span className="font-semibold">400</span>
        </div>

        <div className="flex justify-between text-body-s1">
          <span>Task Completed</span>
          <span className="font-semibold">12</span>
        </div>

        <div className="flex justify-between text-body-s1">
          <span>Active Tasks</span>
          <span className="font-semibold">4</span>
        </div>
      </div>
      <div className="bg-bg-secondary rounded-xl p-4 space-y-4">
        <h5 className="text-h5-2">Top Tasker</h5>

        {mockTopTaskers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div>
              <p className="text-body-s1 font-medium">{user.name}</p>
              <p className="text-caption1 text-text-secondary">
                {user.tasksCompleted} Tasks Completed
              </p>
            </div>

            <StarIcon className="text-yellow-400" />
          </div>
        ))}
      </div>
      <div className="bg-bg-secondary rounded-xl p-4 space-y-2">
        <h5 className="text-h5-2">Trending Tasks</h5>
        <p className="text-body-s1"> Pet Care</p>
        <p className="text-body-s1"> Home Services</p>
        <p className="text-body-s1"> Errands</p>
      </div>
    </aside>
  );
}
