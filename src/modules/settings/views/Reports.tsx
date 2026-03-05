import { useState } from "react";
import { useReports } from "../hooks/useReports";
import { Search, ChevronDown, Flag } from "lucide-react";

type FilterType = "All" | "Tasks" | "Users";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const ReportsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { reportedUsers, isLoading } = useReports({ fetchReportedUsers: true });

  const filterOptions: FilterType[] = ["All", "Tasks", "Users"];
  const filteredData = Array.isArray(filter === "Tasks" ? [] : reportedUsers)
    ? filter === "Tasks"
      ? []
      : reportedUsers
    : [];
  const isEmpty = filteredData.length === 0;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Reports</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium text-text-primary border border-border-default rounded-xl px-4 py-2 hover:bg-bg-primary transition cursor-pointer"
          >
            {filter}
            <ChevronDown
              className={`w-4 h-4 text-text-secondary transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
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
                    ${
                      filter === option
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

      {isLoading ? (
        <div className="text-sm text-text-secondary py-8 text-center">
          Loading...
        </div>
      ) : isEmpty ? (
        <EmptyState
          message={
            filter === "Tasks"
              ? "No reported tasks yet"
              : "No reported users yet"
          }
          desc={
            filter === "Tasks"
              ? "There are no tasks reported at the moment. If an issue arises, reported tasks will appear here for review."
              : "There are no users reported at the moment. If an issue arises, reported users will appear here for review."
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredData.map((report) => (
            <div
              key={report.id}
              className="bg-bg-secondary border border-border-default rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple font-semibold text-sm">
                    {report.reporter?.name?.charAt(0) ?? "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {report.reporter?.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {report.reporter?.email ?? ""}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[report.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {report.status}
                </span>
              </div>

              <div className="flex items-start gap-2 bg-bg-primary rounded-xl px-4 py-3">
                <Flag className="w-4 h-4 text-state-error mt-0.5 shrink-0" />
                <p className="text-sm text-text-secondary">{report.reason}</p>
              </div>

              <p className="text-xs text-text-secondary">
                Reported on{" "}
                {new Date(report.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ message, desc }: { message: string; desc: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
    <div className="w-14 h-14 rounded-full bg-bg-primary flex items-center justify-center">
      <Search className="w-6 h-6 text-text-secondary" />
    </div>
    <p className="text-sm font-semibold text-text-primary">{message}</p>
    <p className="text-xs text-text-secondary max-w-xs">{desc}</p>
  </div>
);

export default ReportsPage;
