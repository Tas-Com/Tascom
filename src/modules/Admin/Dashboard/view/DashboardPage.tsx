import { 
  Users, 
  ClipboardCheck, 
  Search, 
  MapPin,
  MoreVertical
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { ActivityTable } from "../components/ActivityTable";
import { RecentTasks } from "../components/RecentTasks";

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Users" 
          value="50,921" 
          trend="2.9%" 
          trendType="up" 
          icon={Users} 
          iconBgColor="bg-state-success/10"
          iconColor="text-status-active"
          subValue="34,432 new Users"
        />
        <StatCard 
          label="Tasks Completion Rate" 
          value="88%" 
          trend="14.2%" 
          trendType="up" 
          icon={ClipboardCheck} 
          iconBgColor="bg-status-completed/10"
          iconColor="text-status-completed"
          subValue="2157 Completed Tasks"
        />
        <StatCard 
          label="Under Review Reports" 
          value="12" 
          trend="5.0%" 
          trendType="down" 
          icon={Search} 
          iconBgColor="bg-priority-medium-bg"
          iconColor="text-priority-medium-text"
          subValue="3 New Reports"
        />
        <StatCard 
          label="Top Country by Activity" 
          value="Palestine" 
          icon={MapPin} 
          iconBgColor="bg-brand-purple/10"
          iconColor="text-brand-purple"
          subValue="2312 active users"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column: Visualizations & Tables */}
        <div className="xl:col-span-2 space-y-8">
          {/* Task Completion Chart Placeholder */}
          <div className="bg-white p-8 rounded-[20px] border border-border-default/50 shadow-sm min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[18px] font-bold text-text-primary">Task Completion</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-status-active"></span>
                    <span className="text-[12px] font-medium text-text-secondary">Total Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-purple"></span>
                    <span className="text-[12px] font-medium text-text-secondary">Completed Tasks</span>
                </div>
                <button className="flex items-center gap-2 text-[12px] text-text-secondary ml-4">
                    Last week <MoreVertical size={14} />
                </button>
              </div>
            </div>
            
            {/* Visual placeholder for the chart */}
            <div className="h-[250px] w-full relative">
                <svg className="w-full h-full" overflow="visible">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line key={i} x1="0" y1={250 - i * 50} x2="100%" y2={250 - i * 50} stroke="#f0f0f0" strokeWidth="1" />
                    ))}
                    {/* Path 1: Total Tasks */}
                    <path d="M0,200 Q150,180 300,100 T600,150 T900,120" fill="none" stroke="var(--color-status-active)" strokeWidth="3" strokeLinecap="round" />
                    {/* Path 2: Completed Tasks */}
                    <path d="M0,150 Q150,120 300,50 T600,100 T900,70" fill="none" stroke="var(--color-brand-purple)" strokeWidth="3" strokeLinecap="round" />
                    
                    {/* Tooltip mockup */}
                    <rect x="350" y="50" width="120" height="60" rx="12" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))" />
                    <text x="365" y="70" className="text-[10px] fill-text-secondary font-medium">Tuesday</text>
                    <circle cx="365" cy="85" r="4" fill="var(--color-status-active)" />
                    <text x="375" y="88" className="text-[10px] fill-text-primary font-bold">Total Tasks: 12</text>
                    <circle cx="365" cy="100" r="4" fill="var(--color-brand-purple)" />
                    <text x="375" y="103" className="text-[10px] fill-text-primary font-bold">Completed Tasks: 8</text>
                </svg>
                {/* X Axis Labels */}
                <div className="flex justify-between mt-4 text-[11px] text-text-third font-medium">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
            </div>
          </div>

          <ActivityTable />
        </div>

        {/* Right Column: Key Metrics & New Content */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[20px] border border-border-default/50 shadow-sm flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-8">
                <h3 className="text-[18px] font-bold text-text-primary">Points</h3>
                <MoreVertical size={18} className="text-text-secondary cursor-pointer" />
            </div>
            
            {/* Radial Chart Visual Placeholder */}
            <div className="relative w-[180px] h-[180px] mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f8f8f8" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-brand-purple)" strokeWidth="8" 
                        strokeDasharray="251.2" strokeDashoffset="100.48" strokeLinecap="round" className="rotate-[135deg] origin-center" />
                    
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#f8f8f8" strokeWidth="8" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#10b981" strokeWidth="8" 
                        strokeDasharray="188.4" strokeDashoffset="56.52" strokeLinecap="round" className="rotate-[180deg] origin-center" />
                    
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#f8f8f8" strokeWidth="8" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#fbbf24" strokeWidth="8" 
                        strokeDasharray="125.6" strokeDashoffset="37.68" strokeLinecap="round" className="rotate-[225deg] origin-center" />
                </svg>
            </div>

            <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-[12px]">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-purple"></span> Points Earned vs Points Spent :</span>
                    <span className="text-text-primary font-bold text-[14px]">49%</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-active"></span> Active Circulation Rate :</span>
                    <span className="text-text-primary font-bold text-[14px]">88%</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span> Daily Retention Rate :</span>
                    <span className="text-text-primary font-bold text-[14px]">72%</span>
                </div>
            </div>
          </div>

          <RecentTasks />
        </div>
      </div>
    </div>
  );
}
