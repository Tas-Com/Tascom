import { ClipboardList, CheckCircle2, Trash2 } from "lucide-react";
import { StatCard } from "../../Dashboard/components/StatCard";
import { ModTasksTable } from "../components/ModTasksTable";

export function TasksModerationPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Moderation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="New Tasks" 
          value="35" 
          trend="2.9%" 
          trendType="up" 
          icon={ClipboardList} 
          iconBgColor="bg-brand-purple/5"
          iconColor="text-brand-purple"
          subValue="15 pending review"
        />
        <StatCard 
          label="Total Active Tasks" 
          value="2500" 
          trend="14.2%" 
          trendType="up" 
          icon={CheckCircle2} 
          iconBgColor="bg-state-success/10"
          iconColor="text-status-active"
          subValue="2157 recently active"
        />
        <StatCard 
          label="Tasks Removed by Admin" 
          value="20" 
          trend="3.0%" 
          trendType="up" 
          icon={Trash2} 
          iconBgColor="bg-status-canceled/10"
          iconColor="text-status-canceled"
          subValue="3 this month"
        />
      </div>

      {/* Advanced Tasks Table */}
      <ModTasksTable />
    </div>
  );
}
