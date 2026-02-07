import { useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "./Header";
import { Filter } from "./Filter";

export function MainLayout() {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(50);
  const [distance, setDistance] = useState<number>(300);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-primary font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        {/* Fixed Header */}
        <Header userName="" userAvatar="" logoSrc="" />

        <div className="flex flex-1">
          {/* Left Section with Title and Sidebar */}
          <div className="flex flex-col">
            {/* Top Results Title - Only show on results page */}
            {location.pathname === "/results" && (
              <div className="ml-13 mt-[32px]">
                <h2 className="text-text-h2 text-text-primary">Top results</h2>
              </div>
            )}

            {/* Fixed Left Sidebar with Filters */}
            <Filter
              category={category}
              setCategory={setCategory}
              priority={priority}
              setPriority={setPriority}
              points={points}
              setPoints={setPoints}
              distance={distance}
              setDistance={setDistance}
              showPostButton={location.pathname === "/"}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
