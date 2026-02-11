import { Star, PartyPopper } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type TopTasker = {
  id: number;
  name: string;
  tasksCompleted: number;
  image: string;
};

const mockTopTaskers: TopTasker[] = [
  { id: 1, name: "Ali Ahmad", tasksCompleted: 122, image: "/Ali.jpg" },
  { id: 2, name: "Adam Kamil", tasksCompleted: 105, image: "/Adam.jpg" },
  { id: 3, name: "Ayan Maly", tasksCompleted: 89, image: "/Ayan.jpg" },
];

export function RightSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-80 h-[901px] mt-[32px] mr-8 lg:mr-13 bg-secondary">
      <div className="bg-bg-secondary rounded-xl p-4">
        <h5 className="text-h5-1 mb-3 mt-2 text-primary">Tasks Around Me</h5>
        <div className="h-32 rounded-xl relative overflow-hidden">
          <img
            src="/map.png"
            alt="Tasks around me map"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            className="absolute bottom-[8px] right-[12px] h-[36px] w-[120px] 
           bg-brand-purple cursor-pointer text-[#FFFFFF] p-[8px] rounded-[103px] text-btn-s flex items-center justify-center gap-[8px]"
            onClick={() => navigate({ to: "/map" })}
          >
            view map
          </button>
        </div>
      </div>

      <div className="bg-bg-secondary rounded-xl p-4 space-y-4">
        <h5 className="text-h5-2 text-primary mb-8">Your Stats</h5>

        <div className="flex justify-between text-body-s1 text-primary bg-primary">
          <span className="text-body1">Points</span>
          <span className="font-semibold text-brand-purple">400</span>
        </div>

        <div className="flex justify-between text-body-s2 text-primary bg-primary">
          <span>Task Completed</span>
          <span className="font-semibold">12</span>
        </div>

        <div className="flex justify-between text-body-s2 text-primary bg-primary">
          <span>Active Tasks</span>
          <span className="font-semibold">4</span>
        </div>
      </div>
      <div className="bg-bg-secondary rounded-xl p-4 space-y-5">
        <h5 className="text-h5-2 text-primary">Top Tasker</h5>

        {mockTopTaskers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div>
                <p className="text-body1 text-primary">{user.name}</p>
                <p className="text-caption1 text-primary">
                  <span className="text-brand-purple">
                    {user.tasksCompleted}
                  </span>{" "}
                  Tasks Completed
                </p>
              </div>
            </div>
            <Star className="text-icon-star" size={30} fill="currentColor" />
          </div>
        ))}
      </div>
      <div className="bg-bg-secondary rounded-xl p-4 space-y-5">
        <h5 className="text-h5-2 text-primary">Trending Tasks</h5>
        <p className="text-body2 text-primary flex items-center gap-4">
          <PartyPopper className="text-brand-purple" size={20} /> Pet Care
        </p>
        <p className="text-body2 text-primary flex items-center gap-4">
          <PartyPopper className="text-brand-purple" size={20} /> Home Services
        </p>
        <p className="text-body2 text-primary flex items-center gap-4">
          <PartyPopper className="text-brand-purple" size={20} /> Errands
        </p>
      </div>
    </aside>
  );
}
