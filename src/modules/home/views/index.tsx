import { Filter } from "../../../shared/components/layout/Filter";
import { Header } from "../../../shared/components/layout/Header";
import { RightSidebar } from "../../../shared/components/layout/RightSidebar";
import { useTaskFilter } from "../hooks/useTaskFilter";

export const HomePage = () => {
  const filter = useTaskFilter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header userName="" userAvatar=""
        logoSrc="" />
      <div className="flex flex-1 gap-6 p-4">
        <Filter {...filter} />
        <div className="flex-1 bg-white rounded-xl p-4">
          {/* card */}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};
