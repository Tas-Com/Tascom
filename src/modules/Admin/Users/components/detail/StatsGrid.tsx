import { Star, Zap, FileText, CheckCircle2 } from "lucide-react";

interface StatsGridProps {
  rating: number;
  ratingsCount: number;
  points: number;
  posted: number;
  completed: number;
}

export function StatsGrid({ rating, ratingsCount, points, posted, completed }: StatsGridProps) {
  const stats = [
    { label: 'Rating', value: rating, subValue: `${ratingsCount} ratings`, icon: Star, iconColor: 'text-amber-400' },
    { label: 'Points', value: points, icon: Zap, iconColor: 'text-brand-purple' },
    { label: 'Posted', value: posted, icon: FileText, iconColor: 'text-text-secondary' },
    { label: 'Completed', value: completed, icon: CheckCircle2, iconColor: 'text-text-secondary' },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-bg-primary/30 p-6 rounded-[24px] border border-border-default/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text-secondary font-semibold text-[14px]">
            <stat.icon size={16} className={stat.iconColor} />
            {stat.label}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-text-primary">{stat.value}</span>
            {stat.subValue && <span className="text-[12px] text-text-third font-medium">{stat.subValue}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
