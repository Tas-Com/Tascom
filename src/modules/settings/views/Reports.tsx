import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { mockReports, type MockReport } from "@/shared/data/mockReports";

type FilterType = "All" |  "Users";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
};

const ReportsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const filterOptions: FilterType[] = ["All", "Users"];
  const filteredData =
    filter === "All"
      ? mockReports
      : filter === "Users"
      ? mockReports 
      : mockReports; 
  const isEmpty = filteredData.length === 0;
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">
          {filter === "Users" ? "Reported Users" : "Reported Tasks"}
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium text-text-primary border border-border-default rounded-xl px-4 py-2 hover:bg-bg-primary transition cursor-pointer"
          >
            {filter}
            <ChevronDown
              className={`w-4 h-4 text-text-secondary transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 bg-bg-secondary border border-border-default rounded-xl shadow-lg z-50 overflow-hidden w-36">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition cursor-pointer
                    ${filter === option
                      ? "bg-purple-50 text-brand-purple font-medium"
                      : "text-text-primary hover:bg-bg-primary"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {filteredData.slice(0, 3).map((report: MockReport) => (
            <div
              key={report.id}
              className="bg-white border border-border-default rounded-2xl p-5 flex gap-4"
            >
             
              <img
                src={filter === "Users" ? report.profileImage : report.imageUrl}
                alt={filter === "Users" ? report.reporterName : report.reportTitle}
                className={`flex-shrink-0 object-cover ${
                  filter === "Users" ? "w-16 h-16 rounded-full mt-3" : "w-40 h-28 rounded-xl"
                }`}
              />

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">
                    Reported on {report.dateReported}
                  </p>
                  <p className="text-sm font-semibold text-text-primary">
                    {filter === "Users" ? report.reporterName : report.reportTitle}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Reason: {report.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-text-secondary">
                  <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold text-[12px]">!</span>
                  </div>
                  <span>Report ID: #{report.id}</span>
                  <span className="text-purple-600 font-medium cursor-pointer">
                    View Details
                  </span>
                </div>
              </div>

              <span
                className={`inline-block px-2 py-[6px] rounded-full text-xs font-semibold leading-none self-start ${
                  report.status === "PENDING"
                    ? STATUS_STYLES["PENDING"]
                    : STATUS_STYLES["RESOLVED"]
                }`}
              >
                {report.status === "PENDING" ? "Pending" : "Resolved"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
    <div className="w-14 h-14 rounded-full bg-bg-primary flex items-center justify-center">
      <Search className="w-6 h-6 text-text-secondary" />
    </div>
    <p className="text-sm font-semibold text-text-primary">
      No reported tasks yet
    </p>
    <p className="text-xs text-text-secondary max-w-xs">
      There are no tasks reported at the moment. If an issue arises, reported
      tasks will appear here for review.
    </p>
  </div>
);

export default ReportsPage;