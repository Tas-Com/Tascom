import { useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "./Header";
import { Filter } from "./Filter";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";

export function MainLayout() {
  const { data: user } = useCurrentUser();
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(50);
  const [distance, setDistance] = useState<number>(300);
  const location = useLocation();

  const showSidebar = !location.pathname.startsWith("/tasks/") &&
    !location.pathname.startsWith("/map") &&
    !location.pathname.startsWith("/profile");

  return (
    <div className="min-h-screen bg-bg-primary font-sans antialiased z-10">
      <div className="relative flex min-h-screen flex-col">
        <Header
          userName={user?.name || ""}
          userAvatar={user?.assets?.[0]?.url || user?.avatar || ""}
          logoSrc=""
        />

        <div className="flex flex-1">
          {showSidebar && location.pathname !== "/map" && (
            <div className="hidden lg:block">
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
          )}

          <main className="flex-1 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
