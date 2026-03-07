import { StatCard } from "../../Dashboard/components/StatCard";
import { UsersTable } from "../components/UsersTable";
import { useDashboardKpis } from "../../Dashboard/hooks/useDashboard";
import { UserPlus, UserCheck, Flag } from "lucide-react";

export function UsersPage() {
  const { data: kpis, isLoading } = useDashboardKpis('last_week');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Users Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="New Users" 
          value={isLoading ? "..." : String(kpis?.newUsersLastMonth || "0")} 
          trend={`${kpis?.totalUsersChangePct || 0}%`} 
          trendType="up" 
          icon={UserPlus} 
          iconBgColor="bg-brand-purple/5"
          iconColor="text-brand-purple"
          subValue={isLoading ? "..." : `${kpis?.newUsersLastMonth || 0} New this week`}
        />
        <StatCard 
          label="Total Users" 
          value={isLoading ? "..." : String(kpis?.totalUsers || "0")} 
          trend={`${kpis?.totalUsersChangePct || 0}%`} 
          trendType="up" 
          icon={UserCheck} 
          iconBgColor="bg-state-success/10"
          iconColor="text-status-active"
          subValue={isLoading ? "..." : `Total ${kpis?.totalUsers || 0} registered`}
        />
        <StatCard 
          label="Active Users" 
          value={isLoading ? "..." : String(kpis?.activeUsersLastMonth || "0")} 
          trend="0%" 
          trendType="up" 
          icon={Flag} 
          iconBgColor="bg-status-canceled/10"
          iconColor="text-status-canceled"
          subValue={isLoading ? "..." : `${kpis?.activeUsersLastMonth || 0} Active recently`}
        />
      </div>

      {/* Advanced Users Table */}
      <UsersTable />
    </div>
  );
}
