import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { mockTasks, type MockTask } from "@/shared/data/mockTasks";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTasks: MockTask[];
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQueryState] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved
      ? JSON.parse(saved)
      : ["Dog Walking Service", "Home Cleaning", "Computer Repair"];
  });

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
  };

  const filteredTasks = searchQuery.trim()
    ? mockTasks.filter(
        (task) =>
          task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          task.taskerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockTasks;

  const addRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredTasks,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSearching: searchQuery.trim().length > 0,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
