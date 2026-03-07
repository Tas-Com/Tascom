import { useState } from "react";
import {
  ClipboardList,
  Wrench,
  GraduationCap,
  Heart,
  Home,
  Car,
  Filter as FilterIcon,
  X,
  Star,
} from "lucide-react";
import { PostTaskModal } from "../layout/PostTaskModal";
import { apiCategories } from "@/shared/utils";

type FilterVariant = "tasks" | "people";

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
  variant?: FilterVariant;
  minRating?: number;
  setMinRating?: (v: number) => void;
  maxRating?: number;
  setMaxRating?: (v: number) => void;
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
  showPostButton = true,
  variant = "tasks",
  minRating = 1,
  setMinRating,
  maxRating = 5,
  // setMaxRating,
}: Props) {
  const [openPost, setOpenPost] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categoryIcon = (value: string) => {
    switch (value) {
      case "Errands":
        return <ClipboardList size={20} />;
      case "Repairs":
        return <Wrench size={20} />;
      case "Tutoring":
        return <GraduationCap size={20} />;
      case "PetCare":
        return <Heart size={20} />;
      case "HomeServices":
        return <Home size={20} />;
      case "Transportation":
        return <Car size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-brand-purple text-white p-4 rounded-full shadow-lg"
      >
        <FilterIcon size={24} />
      </button>

      <aside className="hidden lg:block w-80 h-243 mt-8 ml-8 lg:ml-13">
        <div className="bg-bg-secondary rounded-xl p-4 md:p-6 space-y-6 md:space-y-8">
          {showPostButton && (
            <button
              onClick={() => setOpenPost(true)}
              className="w-full cursor-pointer bg-brand-purple text-white p-3 md:p-4 rounded-[103px] text-btn-primary mb-4 md:mb-8"
            >
              Post a task
            </button>
          )}

          <h5 className="text-h5-2 text-primary hidden md:block">Filters</h5>

          {variant === "people" ? (
            <>
              <div className="space-y-4">
                <p className="text-h5-2 mb-4 md:mb-6 text-primary">Rating</p>
                <div className="flex justify-between text-body-s2 items-center">
                  <span className="text-body-s1 mr-2 flex items-center gap-1">
                    1 <Star size={14} />
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.5}
                    value={minRating}
                    onChange={(e) => setMinRating?.(Number(e.target.value))}
                    className="w-full accent-brand-purple"
                  />
                  <span className="text-body-s1 ml-2 flex items-center gap-1">
                    5 <Star size={14} />
                  </span>
                </div>
                <p className="text-center text-sm text-text-secondary">
                  Min {minRating} - Max {maxRating}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-h5-2 mb-4 md:mb-6 text-primary">Location</p>
                <div className="flex justify-between text-body-s2">
                  <span className="text-body-s1 text-primary mr-2">300m</span>
                  <input
                    type="range"
                    min={300}
                    max={2000}
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full accent-brand-purple"
                  />
                  <span className="text-body-s1 text-primary ml-2">2000m</span>
                </div>
                <p className="text-center text-sm text-text-secondary">
                  {distance}m
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-h5-2 mb-4 md:mb-8">Categories</p>
                <ul className="space-y-4 md:space-y-6 text-body-s2 text-primary">
                  {apiCategories.map((cat) => (
                    <li
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`flex items-center gap-2 cursor-pointer transition-colors ${
                        category === cat.value
                          ? "text-brand-purple font-semibold"
                          : "hover:text-brand-purple"
                      }`}
                    >
                      {categoryIcon(cat.value)}
                      <span>{cat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-h5-2 mb-4 md:mb-8">Priority</p>
                {["HIGH", "MEDIUM", "LOW"].map((p) => (
                  <label
                    key={p}
                    className="flex gap-2 text-primary cursor-pointer"
                  >
                    <input
                      type="radio"
                      checked={priority === p}
                      onChange={() => setPriority(priority === p ? null : p)}
                      className="accent-brand-purple"
                    />
                    <span className="capitalize">
                      {p.charAt(0) + p.slice(1).toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-h5-2 mb-4 md:mb-6 text-primary">Points</p>
                <div className="flex justify-between text-body-s2">
                  <span className="text-body-s1 mr-2">5</span>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full accent-brand-purple"
                  />
                  <span className="text-body-s1 ml-2">200</span>
                </div>
                <p className="text-center text-sm text-text-secondary">
                  {points} points
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-h5-2 mb-4 md:mb-6 text-primary">Location</p>
                <div className="flex justify-between text-body-s2">
                  <span className="text-body-s1 text-primary mr-2">300m</span>
                  <input
                    type="range"
                    min={300}
                    max={2000}
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full accent-brand-purple"
                  />
                  <span className="text-body-s1 text-primary ml-2">2000m</span>
                </div>
                <p className="text-center text-sm text-text-secondary">
                  {distance}m
                </p>
              </div>
            </>
          )}
        </div>
      </aside>

      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-80 bg-bg-primary p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="bg-bg-secondary rounded-xl p-4 md:p-6 space-y-6 md:space-y-8">
              {showPostButton && (
                <button
                  onClick={() => setOpenPost(true)}
                  className="w-full cursor-pointer bg-brand-purple text-white p-3 md:p-4 rounded-[103px] text-btn-primary mb-4 md:mb-8"
                >
                  Post a task
                </button>
              )}

              <h5 className="text-h5-2 text-primary hidden md:block">
                Filters
              </h5>

              {variant === "people" ? (
                <>
                  <div className="space-y-4">
                    <p className="text-h5-2 mb-4 md:mb-6 text-primary">
                      Rating
                    </p>
                    <div className="flex justify-between text-body-s2 items-center">
                      <span className="text-body-s1 mr-2 flex items-center gap-1">
                        1 <Star size={14} />
                      </span>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={0.5}
                        value={minRating}
                        onChange={(e) => setMinRating?.(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                      <span className="text-body-s1 ml-2 flex items-center gap-1">
                        5 <Star size={14} />
                      </span>
                    </div>
                    <p className="text-center text-sm text-text-secondary">
                      Min {minRating} - Max {maxRating}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-h5-2 mb-4 md:mb-6 text-primary">
                      Location
                    </p>
                    <div className="flex justify-between text-body-s2">
                      <span className="text-body-s1 text-primary mr-2">
                        300m
                      </span>
                      <input
                        type="range"
                        min={300}
                        max={2000}
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                      <span className="text-body-s1 text-primary ml-2">
                        2000m
                      </span>
                    </div>
                    <p className="text-center text-sm text-text-secondary">
                      {distance}m
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-h5-2 mb-4 md:mb-8">Categories</p>
                    <ul className="space-y-4 md:space-y-6 text-body-s2 text-primary">
                      {apiCategories.map((cat) => (
                        <li
                          key={cat.value}
                          onClick={() => setCategory(cat.value)}
                          className={`flex items-center gap-2 cursor-pointer transition-colors ${
                            category === cat.value
                              ? "text-brand-purple font-semibold"
                              : "hover:text-brand-purple"
                          }`}
                        >
                          {categoryIcon(cat.value)}
                          <span>{cat.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p className="text-h5-2 mb-4 md:mb-8">Priority</p>
                    {["HIGH", "MEDIUM", "LOW"].map((p) => (
                      <label
                        key={p}
                        className="flex gap-2 text-primary cursor-pointer"
                      >
                        <input
                          type="radio"
                          checked={priority === p}
                          onChange={() =>
                            setPriority(priority === p ? null : p)
                          }
                          className="accent-brand-purple"
                        />
                        <span className="capitalize">
                          {p.charAt(0) + p.slice(1).toLowerCase()}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p className="text-h5-2 mb-4 md:mb-6 text-primary">
                      Points
                    </p>
                    <div className="flex justify-between text-body-s2">
                      <span className="text-body-s1 mr-2">5</span>
                      <input
                        type="range"
                        min={5}
                        max={200}
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                      <span className="text-body-s1 ml-2">200</span>
                    </div>
                    <p className="text-center text-sm text-text-secondary">
                      {points} points
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-h5-2 mb-4 md:mb-6 text-primary">
                      Location
                    </p>
                    <div className="flex justify-between text-body-s2">
                      <span className="text-body-s1 text-primary mr-2">
                        300m
                      </span>
                      <input
                        type="range"
                        min={300}
                        max={2000}
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                      <span className="text-body-s1 text-primary ml-2">
                        2000m
                      </span>
                    </div>
                    <p className="text-center text-sm text-text-secondary">
                      {distance}m
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className="absolute left-0 top-0 h-full w-[calc(100%-20rem)]"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
        </div>
      )}

      <PostTaskModal isOpen={openPost} onClose={() => setOpenPost(false)} />
    </>
  );
}
