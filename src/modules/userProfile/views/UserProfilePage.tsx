import { useState, useEffect } from "react";
import { useSearch, useParams, useNavigate } from "@tanstack/react-router";
import { ProfileHero } from "../components/ProfileHero";
import { ProfileStats } from "../components/ProfileStats";
import { AboutSkillsSection } from "../components/AboutSkillsSection";
import { ActivitySection } from "../components/ActivitySection";
import { mockPostedTasks, mockRecentWork } from "../data/mockUserProfile";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { restUsers } from "@/modules/profile/repository/restUsers";
import type { User } from "@/modules/Auth/dto/AuthDto";
import { Loader2 } from "lucide-react";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const params = useParams({ strict: false });
  const userId = params.userId as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const showAcceptButton = (search as { showAcceptButton?: boolean }).showAcceptButton;
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      setLoading(true);
      setError(false);
      try {
        const userData = await restUsers().getById(userId);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="w-12 h-12 text-[#6B39F4] animate-spin" />
        <p className="mt-4 text-[#251455] font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-6 animate-in fade-in zoom-in duration-300">
        <EmptyState 
          imageSrc="/empty-messages.png" 
          message={error ? "Something went wrong while loading the profile." : "Oops! This user profile doesn't exist."}
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
