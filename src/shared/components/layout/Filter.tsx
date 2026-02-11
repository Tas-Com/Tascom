import {
  ClipboardList,
  Wrench,
  GraduationCap,
  Heart,
  Home,
  Car,
} from "lucide-react";

type Props = {
  category: string | null;
  setCategory: (v: string) => void;
  priority: string | null;
  setPriority: (v: string | null) => void;
  points: number;
  setPoints: (v: number) => void;
  distance: number;
  setDistance: (v: number) => void;
  showPostButton?: boolean;
};

export function Filter({
  setCategory,
  priority,
  setPriority,
  points,
  setPoints,
  distance,
  setDistance,
  showPostButton = true,
}: Props) {
  return (
    <aside className="w-80 h-[972px] mt-[32px] ml-8 lg:ml-13">
      <div className="bg-bg-secondary rounded-xl p-6 space-y-8">
        {showPostButton && (
          <button className="w-full bg-brand-purple text-white p-[16px] rounded-[103px] text-btn-primary mb-[32px]">
            Post a task
          </button>
        )}
        <h5 className="text-h5-2 text-primary">Filters</h5>
        <div>
          <p className="text-h5-2 mb-8">Categories</p>
          <ul className="space-y-6 text-body-s2 text-primary">
            <li
              onClick={() => setCategory("errands")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ClipboardList size={24} />
              <span>Errands</span>
            </li>
            <li
              onClick={() => setCategory("repairs")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Wrench size={24} />
              <span>Repairs</span>
            </li>
            <li
              onClick={() => setCategory("tutoring")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap size={24} />
              <span>Tutoring</span>
            </li>
            <li
              onClick={() => setCategory("pets")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Heart size={24} />
              <span>Pet Care</span>
            </li>
            <li
              onClick={() => setCategory("home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Home size={24} />
              <span>Home Services</span>
            </li>
            <li
              onClick={() => setCategory("transport")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Car size={24} />
              <span>Transportation</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-h5-2 mb-8">Priority</p>
          {["high", "medium", "low"].map((p) => (
            <label key={p} className="flex gap-2 text-primary">
              <input
                type="radio"
                checked={priority === p}
                onChange={() => setPriority(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-h5-2 mb-6 text-primary">Points</p>
          <div className="flex justify-between text-body-s2">
            <span className="text-body-s1 mr-2">5</span>
            <input
              type="range"
              min={5}
              max={200}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-body-s1 ml-2">200</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-h5-2 mb-6 text-primary">Location</p>
          <div className="flex justify-between text-body-s2">
            <span className=" text-body-s1 text-primary mr-2">300</span>
            <input
              type="range"
              min={300}
              max={2000}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-body-s1 text-primary ml-2">2000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
