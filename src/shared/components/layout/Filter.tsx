import {
  Assignment,
  Build,
  School,
  Pets,
  Home,
  DirectionsCar,
} from "@mui/icons-material";

type Props = {
  category: string | null;
  setCategory: (v: string) => void;
  priority: string | null;
  setPriority: (v: any) => void;
  points: number;
  setPoints: (v: number) => void;
  distance: number;
  setDistance: (v: number) => void;
};

export function Filter({
  category,
  setCategory,
  priority,
  setPriority,
  points,
  setPoints,
  distance,
  setDistance,
}: Props) {
  return (
    <aside className="space-y-6 w-72 bg-gray-100">
      <button className="w-full bg-brand-purple text-white py-3 rounded-xl text-btn-primary">
        Post a task
      </button>
      <div className="bg-bg-secondary rounded-xl p-4 space-y-6">
        <h5 className="text-h5-2">Filters</h5>
{/* تعديل اللينك */}
        <div>
          <p className="text-body-s2 mb-3">Categories</p>
          <ul className="space-y-3 text-body-s1 text-text-secondary">
            <li onClick={() => setCategory("errands")} className="flex gap-2 cursor-pointer">
              <Assignment fontSize="small" /> Errands
            </li>
            <li onClick={() => setCategory("repairs")} className="flex gap-2 cursor-pointer">
              <Build fontSize="small" /> Repairs
            </li>
            <li onClick={() => setCategory("tutoring")} className="flex gap-2 cursor-pointer">
              <School fontSize="small" /> Tutoring
            </li>
            <li onClick={() => setCategory("pets")} className="flex gap-2 cursor-pointer">
              <Pets fontSize="small" /> Pet Care
            </li>
            <li onClick={() => setCategory("home")} className="flex gap-2 cursor-pointer">
              <Home fontSize="small" /> Home Services
            </li>
            <li onClick={() => setCategory("transport")} className="flex gap-2 cursor-pointer">
              <DirectionsCar fontSize="small" /> Transportation
            </li>
          </ul>
        </div>
        <div>
          <p className="text-body-s2 mb-2">Priority</p>
          {["high", "medium", "low"].map((p) => (
            <label key={p} className="flex gap-2">
              <input
                type="radio"
                checked={priority === p}
                onChange={() => setPriority(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <div>
          <p className="text-body-s2 mb-2">Points: {points}</p>
          <input
            type="range"
            min={5}
            max={200}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <p className="text-body-s2 mb-2">Distance: {distance}m</p>
          <input
            type="range"
            min={300}
            max={2000}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
}
