import React from "react";
import { Zap, FileText, ClipboardList, FileCheck } from "lucide-react";

interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
}

const StatItem = ({ icon: Icon, label, value }: StatItemProps) => (
    <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-2 min-w-[90px] sm:min-w-[110px]">
        <div className="flex items-center gap-2">
            <Icon size={18} className="sm:size-5 xl:size-[22px] text-(--colors-Text-third,#6E6E6E)" />
            <span className="font-[Poppins] font-medium text-[16px] xl:text-[18px] leading-none text-(--colors-Text-third,#6E6E6E)">
                {label}
            </span>
        </div>
        <span className="font-[Poppins] font-semibold text-[24px] sm:text-[28px] xl:text-[32px] leading-[1.2] text-(--colors-Text-primary,#251455)">
            {value}
        </span>
    </div>
);

interface OverviewCardProps {
    points: number;
    posts: number;
    claimed: number;
    completed: number;
}

export const OverviewCard = ({
    points,
    posts,
    claimed,
    completed,
}: OverviewCardProps) => {
    return (
        <div className="w-full max-w-[970px] bg-white rounded-[16px] py-[24px] xl:py-[36px] px-[24px] sm:px-[32px] xl:px-[40px] shadow-sm">
            <h3 className="font-[Poppins] font-semibold text-[18px] sm:text-[20px] leading-[1.2] text-(--colors-Text-primary,#251455) mb-6 xl:mb-8">
                Overview
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-[32px]">
                <StatItem icon={Zap} label="Points" value={points} />
                <StatItem icon={FileText} label="Posts" value={posts} />
                <StatItem icon={ClipboardList} label="Claimed" value={claimed} />
                <StatItem icon={FileCheck} label="Completed" value={completed} />
            </div>
        </div>
    );
};
