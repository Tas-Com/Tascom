import { Star } from "lucide-react";

interface ProfileStatsProps {
  ratingAvg: number;
  totalRatings: number;
  completionRate: number;
}

export function ProfileStats({ ratingAvg, totalRatings, completionRate }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6 pb-6 bg-white">
      <div className="bg-[#F9F9F9] p-6 rounded-2xl flex flex-col gap-2">
        <h4 className="text-[14px] font-medium text-[#251455] opacity-60">Overall Rating</h4>
        <div className="flex items-center gap-2">
          <Star size={20} fill="#FFB800" className="text-[#FFB800]" />
          <span className="text-[20px] font-bold text-[#251455]">{ratingAvg}</span>
          <span className="text-[14px] text-gray-400 font-medium">{totalRatings} ratings</span>
        </div>
      </div>

      <div className="bg-[#F9F9F9] p-6 rounded-2xl flex flex-col gap-2">
        <h4 className="text-[14px] font-medium text-[#251455] opacity-60">Completion Rate</h4>
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-bold text-[#251455]">{completionRate}%</span>
          <span className="text-[14px] text-gray-400 font-medium">{totalRatings} ratings</span>
        </div>
      </div>
    </div>
  );
}
