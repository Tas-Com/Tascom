import { UserPlus, UserCheck, Flag } from "lucide-react";
import { StatCard } from "../../Dashboard/components/StatCard";
import { UsersTable } from "../components/UsersTable";

export function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Users Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="New Users" 
          value="35" 
          trend="2.9%" 
          trendType="up" 
          icon={UserPlus} 
          iconBgColor="bg-brand-purple/5"
          iconColor="text-brand-purple"
          subValue="15"
        />
        <StatCard 
          label="Active Users" 
          value="2500" 
          trend="14.2%" 
          trendType="up" 
          icon={UserCheck} 
          iconBgColor="bg-state-success/10"
          iconColor="text-status-active"
          subValue="2157"
        />
        <StatCard 
          label="Restricted Users" 
          value="134" 
          trend="5.0%" 
          trendType="down" 
          icon={Flag} 
          iconBgColor="bg-status-canceled/10"
          iconColor="text-status-canceled"
          subValue="3"
        />
      </div>

      {/* Advanced Users Table */}
      <UsersTable />
    </div>
  );
}
