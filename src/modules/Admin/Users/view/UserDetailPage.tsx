import { useState } from "react";
import { cn } from "@/shared/utils";
import { ProfileHeader } from "../components/detail/ProfileHeader";
import { StatsGrid } from "../components/detail/StatsGrid";
import { ContactInfo } from "../components/detail/ContactInfo";
import { TasksTab } from "../components/detail/TasksTab";
import { ReportsTab } from "../components/detail/ReportsTab";

export function UserDetailPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'reports'>('posts');

  // MOCK DATA
  const user = {
    name: 'Samir Ali',
    avatar: '/Samir.jpg',
    status: 'Active',
    stats: {
      rating: 4.5,
      ratingsCount: 30,
      points: 5342,
      posted: 30,
      completed: 65
    },
    contact: {
      email: 'samir-ali@gmail.com',
      phone: '+970 793 6416',
      location: 'Ramallah, Palestine',
      joinedDate: 'Jan 16, 2026'
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* User Information Card */}
      <div className="bg-white p-10 rounded-[24px] border border-border-default/50 shadow-sm space-y-10">
        <ProfileHeader 
          name={user.name} 
          avatar={user.avatar} 
          status={user.status} 
        />
        
        <StatsGrid 
          rating={user.stats.rating}
          ratingsCount={user.stats.ratingsCount}
          points={user.stats.points}
          posted={user.stats.posted}
          completed={user.stats.completed}
        />

        <ContactInfo 
          email={user.contact.email}
          phone={user.contact.phone}
          location={user.contact.location}
          joinedDate={user.contact.joinedDate}
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
          {activeTab === 'posts' ? <TasksTab /> : <ReportsTab />}
        </div>
      </div>
    </div>
  );
}
