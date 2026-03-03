import { useSearch, useParams, useNavigate } from "@tanstack/react-router";
import { ProfileHero } from "../components/ProfileHero";
import { ProfileStats } from "../components/ProfileStats";
import { AboutSkillsSection } from "../components/AboutSkillsSection";
import { ActivitySection } from "../components/ActivitySection";
import { mockUserProfiles, mockPostedTasks, mockRecentWork } from "../data/mockUserProfile";
import { EmptyState } from "@/shared/components/ui/EmptyState";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const params = useParams({ strict: false });
  const userId = params.userId ? parseInt(params.userId as string) : null;
  
  const showAcceptButton = (search as { showAcceptButton?: boolean }).showAcceptButton;
  
  const user = userId ? mockUserProfiles[userId] : null;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-6 animate-in fade-in zoom-in duration-300">
        <EmptyState 
          imageSrc="/empty-messages.png" 
          message="Oops! This user profile doesn't exist."
        />
        <button 
          onClick={() => navigate({ to: "/" })}
          className="px-8 py-3 bg-[#6B39F4] text-white rounded-full font-semibold hover:bg-[#5a2ed1] transition-all shadow-lg active:scale-95"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[32px] font-bold text-[#251455] ml-4">{user.name.split(' ')[0]} Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-100">
        <ProfileHero user={user} showAcceptButton={showAcceptButton} />
        <ProfileStats 
          ratingAvg={user.ratingAvg} 
          totalRatings={30} 
          completionRate={90} 
        />
        
        <div className="p-8 border-t border-gray-50 bg-[#F2F4F7]/10">
          <AboutSkillsSection 
            about={user.about} 
            skills={user.skills} 
          />
        </div>

        <div className="p-8 flex flex-col lg:flex-row gap-8">
          <ActivitySection 
            title={`Tasks Posted by ${user.name.split(' ')[0]}`} 
            tasks={mockPostedTasks} 
            type="posted"
          />
          <ActivitySection 
            title="Recent Work" 
            tasks={mockRecentWork} 
            type="recent"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
