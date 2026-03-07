import { createContext, useState, useEffect, type ReactNode } from "react";
import type { SearchFilters } from "@/modules/tasks/repository/SearchDtos";
import { useLocation } from "@/shared/hooks/useLocation";

type SearchType = "tasks" | "people";

interface SearchFiltersState {
  categories: string[];
  priorities: string[];
  minPoints: number | undefined;
  maxPoints: number | undefined;
  minDistance: number | undefined;
  maxDistance: number | undefined;
  minRating: number | undefined;
  maxRating: number | undefined;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  isSearching: boolean;
  filters: SearchFiltersState;
  setCategories: (categories: string[]) => void;
  setPriorities: (priorities: string[]) => void;
  setMinPoints: (minPoints: number | undefined) => void;
  setMaxPoints: (maxPoints: number | undefined) => void;
  setMinDistance: (minDistance: number | undefined) => void;
  setMaxDistance: (maxDistance: number | undefined) => void;
  setMinRating: (minRating: number | undefined) => void;
  setMaxRating: (maxRating: number | undefined) => void;
  clearFilters: () => void;
  buildSearchFilters: (page?: number, limit?: number) => SearchFilters;
  buildTaskFilters: (
    page?: number,
    limit?: number,
  ) => Record<string, string | number | undefined>;
}

const defaultFilters: SearchFiltersState = {
  categories: [],
  priorities: [],
  minPoints: undefined,
  maxPoints: undefined,
  minDistance: undefined,
  maxDistance: undefined,
  minRating: undefined,
  maxRating: undefined,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export { SearchContext };

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQueryState] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });

  const [searchType, setSearchType] = useState<SearchType>("tasks");

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved
      ? JSON.parse(saved)
      : ["Dog Walking Service", "Home Cleaning", "Computer Repair"];
  });

  const [filters, setFilters] = useState<SearchFiltersState>(defaultFilters);

  const { location } = useLocation();

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
  };

  const addRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const setCategories = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }));
  };

  const setPriorities = (priorities: string[]) => {
    setFilters((prev) => ({ ...prev, priorities }));
  };

  const setMinPoints = (minPoints: number | undefined) => {
    setFilters((prev) => ({ ...prev, minPoints }));
  };

  const setMaxPoints = (maxPoints: number | undefined) => {
    setFilters((prev) => ({ ...prev, maxPoints }));
  };

  const setMinDistance = (minDistance: number | undefined) => {
    setFilters((prev) => ({ ...prev, minDistance }));
  };

  const setMaxDistance = (maxDistance: number | undefined) => {
    setFilters((prev) => ({ ...prev, maxDistance }));
  };

  const setMinRating = (minRating: number | undefined) => {
    setFilters((prev) => ({ ...prev, minRating }));
  };

  const setMaxRating = (maxRating: number | undefined) => {
    setFilters((prev) => ({ ...prev, maxRating }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const buildSearchFilters = (page = 1, limit = 10): SearchFilters => {
    const searchFilters: SearchFilters = {
      type: searchType,
      query: searchQuery || undefined,
      page,
      limit,
    };

    if (filters.categories.length > 0) {
      searchFilters.categories = filters.categories.join(",");
    }

    if (filters.priorities.length > 0) {
      searchFilters.priorities = filters.priorities.join(",");
    }

    if (filters.minPoints !== undefined) {
      searchFilters.minPoints = filters.minPoints;
    }

    if (filters.maxPoints !== undefined) {
      searchFilters.maxPoints = filters.maxPoints;
    }

    if (filters.minDistance !== undefined) {
      searchFilters.minDistance = filters.minDistance;
    }

    if (filters.maxDistance !== undefined) {
      searchFilters.maxDistance = filters.maxDistance;
    }

    if (filters.minRating !== undefined) {
      searchFilters.minRating = filters.minRating;
    }

    if (filters.maxRating !== undefined) {
      searchFilters.maxRating = filters.maxRating;
    }

    if (location) {
      searchFilters.userLat = location.latitude;
      searchFilters.userLng = location.longitude;
    }

    return searchFilters;
  };

  const buildTaskFilters = (
    page = 1,
    limit = 10,
  ): Record<string, string | number | undefined> => {
    const params: Record<string, string | number | undefined> = {
      page,
      limit,
    };

    if (filters.categories.length > 0) {
      params.categories = filters.categories.join(",");
    }

    if (filters.priorities.length > 0) {
      params.priorities = filters.priorities.join(",");
    }

    if (filters.minPoints !== undefined) {
      params.minPoints = filters.minPoints;
    }

    if (filters.maxPoints !== undefined) {
      params.maxPoints = filters.maxPoints;
    }

    if (filters.minDistance !== undefined) {
      params.minDistance = filters.minDistance;
    }

    if (filters.maxDistance !== undefined) {
      params.maxDistance = filters.maxDistance;
    }

    if (location) {
      params.userLat = location.latitude;
      params.userLng = location.longitude;
    }

    return params;
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchType,
        setSearchType,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSearching: searchQuery.trim().length > 0,
        filters,
        setCategories,
        setPriorities,
        setMinPoints,
        setMaxPoints,
        setMinDistance,
        setMaxDistance,
        setMinRating,
        setMaxRating,
        clearFilters,
        buildSearchFilters,
        buildTaskFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
