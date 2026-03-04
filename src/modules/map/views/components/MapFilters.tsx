import React, { useState } from "react";
import {
  Calendar,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MapFiltersProps {
  locationName: string;
  date?: string;
  points?: number;
  onDateChange?: () => void;
  onPointsChange?: (value: number) => void;
}

export const MapFilters: React.FC<MapFiltersProps> = ({
  locationName,
  date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date()),
  points = 15,
  onDateChange,
  onPointsChange,
}) => {
  const textStyle =
    "font-['Poppins'] text-[16px] font-normal leading-[150%] text-[#251455]";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filterRows = (mobile?: boolean) => (
    <>
      <div
        className={cn(
          "flex items-center gap-4 border-b border-gray-100/50 transition-colors cursor-pointer",
          mobile ? "py-3" : "pb-4",
        )}
      >
        <Search size={20} className="text-[#251455] shrink-0" />
        <span className={cn(textStyle, "truncate")}>{locationName}</span>
      </div>

      <button
        onClick={onDateChange}
        className={cn(
          "flex items-center gap-4 border-b border-gray-100/50 transition-colors cursor-pointer text-left w-full",
          mobile ? "py-3" : "pb-4",
        )}
      >
        <Calendar size={20} className="text-[#251455] shrink-0" />
        <span className={textStyle}>{date}</span>
      </button>

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <Zap size={20} className="text-[#251455] shrink-0" />
            <span className={textStyle}>{points} Points</span>
          </div>
          <div className="flex items-center gap-1 text-[#251455]/60">
            <button
              onClick={() => onPointsChange?.(Math.max(0, (points || 0) - 5))}
              className="p-1 hover:bg-gray-100 rounded-full text-text-primary transition-colors cursor-pointer"
              type="button"
            >
              <ChevronDown size={18} />
            </button>
            <button
              onClick={() => onPointsChange?.((points || 0) + 5)}
              className="p-1 hover:bg-gray-100 text-text-primary rounded-full transition-colors cursor-pointer"
              type="button"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="md:hidden absolute top-3 left-3 right-3 z-10 flex gap-2">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 flex-1 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/40"
        >
          <Search size={18} className="text-brand-purple" />
          <span className="text-sm text-text-secondary truncate">
            {locationName}
          </span>
        </button>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/40"
        >
          <SlidersHorizontal size={18} className="text-brand-purple" />
        </button>
      </div>

      {isMobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-6 pb-2">
              <h3 className="text-body-s1 text-primary">Search &amp; Filter</h3>
              <button onClick={() => setIsMobileOpen(false)} className="p-1">
                <X size={20} className="text-text-secondary" />
              </button>
            </div>
            <div className="flex flex-col gap-4 px-6 pb-6">
              {filterRows(true)}
            </div>
          </div>
        </>
      )}

      <div
        className="hidden md:flex absolute top-6 left-6 z-10 flex-col bg-white/95 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/40"
        style={{ width: 327, padding: 24, gap: 16 }}
      >
        {filterRows()}
      </div>
    </>
  );
};
