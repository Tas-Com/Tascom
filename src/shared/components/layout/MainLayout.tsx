import { Suspense } from "react";
import { Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { Header } from "./Header";
import { Filter } from "./Filter";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { useSearchContext } from "@/shared/hooks/useSearchContext";

export function MainLayout() {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const {
    searchType,
    filters,
    setCategories,
    setPriorities,
    setMinPoints,
    setMaxPoints,
    setMinDistance,
    setMaxDistance,
    setMinRating,
    setMaxRating,
  } = useSearchContext();

  const resolvedLocation = useRouterState({
    select: (s) => s.resolvedLocation,
  });
  const pathname = resolvedLocation?.pathname ?? "/";
  const isHomePage = pathname === "/";
  const isResultsPage = pathname === "/results";

  // Derive local filter values from context
  const category = filters.categories.length > 0 ? filters.categories[0] : null;
  const priority = filters.priorities.length > 0 ? filters.priorities[0] : null;
  const points = filters.maxPoints ?? 200;
  const distance = filters.maxDistance ?? 2000;
  const minRating = filters.minRating ?? 1;
  const maxRating = filters.maxRating ?? 5;

  const handleCategoryChange = (cat: string) => {
    const newCategories = category === cat ? [] : [cat];
    setCategories(newCategories);
    if (isHomePage) navigate({ to: "/results" });
  };

  const handlePriorityChange = (p: string | null) => {
    setPriorities(p ? [p] : []);
    if (isHomePage) navigate({ to: "/results" });
  };

  const handlePointsChange = (val: number) => {
    setMinPoints(5);
    setMaxPoints(val);
    if (isHomePage) navigate({ to: "/results" });
  };

  const handleDistanceChange = (val: number) => {
    setMinDistance(300);
    setMaxDistance(val);
    if (isHomePage) navigate({ to: "/results" });
  };

  const handleMinRatingChange = (val: number) => {
    setMinRating(val);
    if (isHomePage) navigate({ to: "/results" });
  };

  const handleMaxRatingChange = (val: number) => {
    setMaxRating(val);
    if (isHomePage) navigate({ to: "/results" });
  };

  const showFilter =
    pathname !== "/map" &&
    !pathname.startsWith("/tasks/") &&
    !pathname.startsWith("/profile") &&
    !pathname.startsWith("/notifications") &&
    !pathname.startsWith("/chat") &&
    !pathname.startsWith("/user-profile");

  const filterVariant =
    isResultsPage && searchType === "people" ? "people" : "tasks";

  return (
    <div className="min-h-screen bg-bg-primary font-sans antialiased z-10">
      <div className="relative flex min-h-screen flex-col">
        <Header
          userName={user?.name || ""}
          userAvatar={
            user?.assets?.find((a) => !a.taskId)?.url || user?.avatar || ""
          }
          logoSrc=""
        />

        <div className="flex flex-1">
          {showFilter && (
            <div className="flex flex-col">
              {isResultsPage && (
                <div className="ml-13 mt-8">
                  <h2 className="text-text-h2 text-text-primary">
                    Top results
                  </h2>
                </div>
              )}

              <Filter
                category={category}
                setCategory={handleCategoryChange}
                priority={priority}
                setPriority={handlePriorityChange}
                points={points}
                setPoints={handlePointsChange}
                distance={distance}
                setDistance={handleDistanceChange}
                showPostButton={isHomePage}
                variant={filterVariant}
                minRating={minRating}
                setMinRating={handleMinRatingChange}
                maxRating={maxRating}
                setMaxRating={handleMaxRatingChange}
              />
            </div>
          )}

          <main className="flex-1">
            <Suspense>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
