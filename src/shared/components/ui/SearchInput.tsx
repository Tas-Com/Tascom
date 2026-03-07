import { useState, useRef, useEffect } from "react";
import {
  Search,
  Sparkles,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ChevronDown,
  X,
  User,
} from "lucide-react";
import { useSearchContext } from "@/shared/hooks/useSearchContext";
import { useNavigate } from "@tanstack/react-router";
import { useSearch } from "@/modules/search/hooks/useSearch";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearchContext();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: searchResults } = useSearch({
    type: searchType,
    query: debouncedQuery,
  });

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
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    addRecentSearch(search);
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

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleModeSearch = (mode: string) => {
    setIsOpen(false);
    navigate({ to: "/results", search: { mode } });
  };

  const handleResultClick = (name: string) => {
    setSearchQuery(name);
    addRecentSearch(name);
    setIsOpen(false);
    navigate({ to: "/results" });
  };

  const typeLabel = searchType === "tasks" ? "Tasks" : "People";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract autocomplete results
  const autocompleteResults = searchResults?.data?.slice(0, 3) ?? [];

  return (
    <div className="relative w-full max-w-150">
      <div className="flex items-center bg-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-[#DEDEDE]">
        <Search className="text-primary mr-1 sm:mr-2 shrink-0" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none w-full text-sm sm:text-base min-w-0"
        />
        {searchQuery && (
          <button onClick={handleClear} className="shrink-0 mr-1">
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
        <Sparkles
          className="text-primary ml-1 sm:ml-2 hidden sm:block shrink-0"
          size={24}
        />
        <div className="w-px h-5 sm:h-7 bg-gray-300 mx-1 sm:mx-2 hidden sm:block"></div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
            className="text-label1 text-text-primary ml-1 sm:ml-2 flex items-center gap-1 hover:text-brand-purple transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">{typeLabel}</span>
            <ChevronDown size={16} className="sm:w-4 sm:h-4" />
          </button>
          {typeDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-50 min-w-28">
              <button
                onClick={() => {
                  setSearchType("tasks");
                  setTypeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  searchType === "tasks"
                    ? "text-brand-purple font-semibold"
                    : "text-gray-700"
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => {
                  setSearchType("people");
                  setTypeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  searchType === "people"
                    ? "text-brand-purple font-semibold"
                    : "text-gray-700"
                }`}
              >
                People
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 z-50">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[13px] text-brand-purple">
              AI-powered search that understands your needs
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => handleModeSearch("near_me")}
              className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-full text-sm"
            >
              <MapPin size={14} />
              Near me
            </button>
            {searchType === "tasks" && (
              <>
                <button
                  onClick={() => handleModeSearch("available_today")}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  <Clock size={14} />
                  Available today
                </button>
                <button
                  onClick={() => handleModeSearch("quick")}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  <Clock size={14} />
                  Quick tasks
                </button>
              </>
            )}
            <button
              onClick={() => handleModeSearch("top_rated")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              <Star size={14} />
              Top rated
            </button>
          </div>

          {/* Autocomplete Results */}
          {searchQuery.trim().length >= 2 && autocompleteResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Results
              </h3>
              <div className="space-y-2">
                {autocompleteResults.map((result: any) => (
                  <button
                    key={result.id}
                    onClick={() =>
                      handleResultClick(
                        searchType === "tasks" ? result.title : result.name,
                      )
                    }
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {searchType === "people" && result.avatar ? (
                        <img
                          src={result.avatar}
                          alt={result.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : searchType === "people" ? (
                        <User size={16} className="text-gray-400" />
                      ) : null}
                      <span className="text-sm text-gray-900">
                        {searchType === "tasks" ? result.title : result.name}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
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
          )}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
