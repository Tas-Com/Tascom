import { Flame, RefreshCw, CheckCircle2 } from "lucide-react";
import { StatCard } from "../../Dashboard/components/StatCard";
import { ReportsTable } from "../components/ReportsTable";

export function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Reports Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="Open Reports" 
          value="35" 
          trend="2.9%" 
          trendType="up" 
          icon={Flame} 
          iconBgColor="bg-brand-purple/5"
          iconColor="text-brand-purple"
          subValue="15"
        />
        <StatCard 
          label="Under Review" 
          value="2500" 
          trend="14.2%" 
          trendType="up" 
          icon={RefreshCw} 
          iconBgColor="bg-state-success/10"
          iconColor="text-status-active"
          subValue="2157"
        />
        <StatCard 
          label="Resolved Today" 
          value="134" 
          trend="5.0%" 
          trendType="down" 
          icon={CheckCircle2} 
          iconBgColor="bg-brand-purple/5"
          iconColor="text-[#219FFF]"
          subValue="3"
        />
      </div>

      {/* Advanced Reports Table */}
      <ReportsTable />
    </div>
  );
}
