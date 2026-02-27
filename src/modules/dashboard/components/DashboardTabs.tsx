import { cn } from "@/lib/utils";

interface DashboardTabsProps {
    activeTab: "posted" | "claimed";
    onTabChange: (tab: "posted" | "claimed") => void;
}

export const DashboardTabs = ({
    activeTab,
    onTabChange,
}: DashboardTabsProps) => {
    return (
        <div className="w-full max-w-[970px] bg-[#E8E8EC] p-1 rounded-[40px] flex items-center h-[42px] sm:h-[48px]">
            <button
                onClick={() => onTabChange("posted")}
                className={cn(
                    "flex-1 h-full rounded-[40px] font-[Poppins] font-medium text-[13px] sm:text-[15px] transition-all",
                    activeTab === "posted"
                        ? "bg-white text-brand-purple shadow-sm"
                        : "text-[#6E6E6E]"
                )}
            >
                Posted
            </button>
            <button
                onClick={() => onTabChange("claimed")}
                className={cn(
                    "flex-1 h-full rounded-[40px] font-[Poppins] font-medium text-[13px] sm:text-[15px] transition-all",
                    activeTab === "claimed"
                        ? "bg-white text-brand-purple shadow-sm"
                        : "text-[#6E6E6E]"
                )}
            >
                Claimed
            </button>
        </div>
    );
};
