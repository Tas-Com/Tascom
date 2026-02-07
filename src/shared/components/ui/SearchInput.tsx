import { useState } from "react";
import {
  Search,
  Sparkles,
  MapPin,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { useSearchContext } from "@/shared/contexts/SearchContext";
import { useNavigate } from "@tanstack/react-router";

export function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    filteredTasks,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearchContext();
  const navigate = useNavigate();
  const showResults = searchQuery.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResultClick = (task: any) => {
    setSearchQuery(task.taskTitle);
    addRecentSearch(task.taskTitle);
    setIsOpen(false);
    navigate({ to: "/results" });
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setIsOpen(false);
    navigate({ to: "/results" });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      setIsOpen(false);
      navigate({ to: "/results" });
    }
  };

  return (
    <div className="relative w-full max-w-[600px]">
      <div className="flex items-center bg-white px-4 py-2 rounded-2xl border border-[#DEDEDE]">
        <Search className="text-primary mr-2" size={30} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none w-full"
        />
        <Sparkles className="text-primary ml-2" size={30} />
        <div className="w-px h-7 bg-gray-300 mx-2"></div>
        <button
          onClick={handleSearch}
          className="text-label1 text-text-primary ml-2 flex items-center gap-1 hover:text-brand-purple transition-colors"
        >
          Tasks
          <ChevronRight size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 z-50">
          {/* AI-powered search message */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[13px] text-brand-purple">
              AI-powered search that understands your needs
            </span>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-full text-sm">
              <MapPin size={14} />
              Near me
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              <Clock size={14} />
              Available today
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              <Clock size={14} />
              Quick tasks
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              <Star size={14} />
              Top rated
            </button>
          </div>

          {/* Results section */}
          {showResults && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Results
              </h3>
              <div className="space-y-2">
                {filteredTasks.slice(0, 5).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleResultClick(task)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-900">
                        {task.taskTitle}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent searches section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Recent</h3>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-brand-purple hover:text-purple-600 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-900">{search}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
