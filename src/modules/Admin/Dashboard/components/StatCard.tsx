import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/shared/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  subValue?: string;
}

export function StatCard({ 
  label, 
  value, 
  trend, 
  trendType = 'up', 
  icon: Icon,
  iconBgColor = 'bg-bg-card-hover',
  iconColor = 'text-brand-purple',
  subValue
}: StatCardProps) {
  return (
    <div className="bg-white p-[24px] rounded-[20px] border border-border-default/50 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[12px] font-medium text-text-secondary">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-[28px] font-bold text-text-primary tracking-tight">{value}</h3>
            {trend && (
              <div className={cn(
                "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold",
                trendType === 'up' ? "text-status-active bg-status-active/10" : "text-status-canceled bg-status-canceled/10"
              )}>
                {trendType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trend}
              </div>
            )}
          </div>
          {subValue && (
            <p className="text-[11px] text-text-third font-medium">
              Last month: <span className="text-text-secondary font-semibold">{subValue}</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-2xl", iconBgColor)}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
