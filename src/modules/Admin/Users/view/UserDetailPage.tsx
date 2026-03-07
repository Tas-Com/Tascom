import { useState } from "react";
import { cn } from "@/shared/utils";
import { ProfileHeader } from "../components/detail/ProfileHeader";
import { StatsGrid } from "../components/detail/StatsGrid";
import { ContactInfo } from "../components/detail/ContactInfo";
import { TasksTab } from "../components/detail/TasksTab";
import { ReportsTab } from "../components/detail/ReportsTab";
import { useParams } from "@tanstack/react-router";
import { useAdminUser, useAdminUserStats } from "../hooks/useAdminUsers";

export function UserDetailPage() {
  const { userId } = useParams({ from: '/admin/users/$userId' });
  const [activeTab, setActiveTab] = useState<'posts' | 'reports'>('posts');

  const { data: user, isLoading: userLoading, isError } = useAdminUser(userId);
  const { data: stats, isLoading: statsLoading } = useAdminUserStats(userId);

  if (userLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[18px] font-bold text-text-secondary animate-pulse">Loading user details...</div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[18px] font-bold text-status-canceled">Error: User not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* User Information Card */}
      <div className="bg-white p-10 rounded-[24px] border border-border-default/50 shadow-sm space-y-10">
        <ProfileHeader 
          name={user.name} 
          avatar={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
          status={user.customerStatus === 'ACTIVE' ? 'Active' : user.customerStatus === 'BANNED' ? 'Banned' : 'Suspended'} 
        />
        
        <StatsGrid 
          rating={0} // Still missing from these endpoints, maybe in a separate rating call if needed
          ratingsCount={0}
          points={stats?.points || 0}
          posted={stats?.posts || 0}
          completed={stats?.completed || 0}
        />
 
        <ContactInfo 
          email={user.email}
          phone={user.phoneNumber || 'Not provided'}
          location={user.location || user.country}
          joinedDate={new Date(user.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Tabbed Content Section */}
      <div className="space-y-8">
        {/* Customized Tab Navigation */}
        <div className="flex bg-[#E9EAF0]/50 p-1.5 rounded-[20px] w-full max-w-[1200px] mx-auto">
          <button 
            onClick={() => setActiveTab('posts')}
            className={cn(
              "flex-1 py-4 px-8 rounded-[18px] text-[16px] font-bold transition-all duration-300",
              activeTab === 'posts' 
                ? "bg-white text-brand-purple shadow-sm" 
                : "text-text-third hover:text-text-secondary"
            )}
          >
            Posts
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={cn(
              "flex-1 py-4 px-8 rounded-[18px] text-[16px] font-bold transition-all duration-300",
              activeTab === 'reports' 
                ? "bg-white text-brand-purple shadow-sm" 
                : "text-text-third hover:text-text-secondary"
            )}
          >
            Reports
          </button>
        </div>

        {/* Tab Panels */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'posts' ? <TasksTab userId={userId} /> : <ReportsTab userId={userId} />}
        </div>
      </div>
    </div>
  );
}
