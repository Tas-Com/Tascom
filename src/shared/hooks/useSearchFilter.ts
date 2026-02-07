import { useState } from "react";
import { mockTasks } from "@/shared/data/mockTasks";

export function useSearchFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Dog Walking Service",
    "Home Cleaning",
    "Computer Repair",
  ]);

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

  return {
    searchQuery,
    setSearchQuery,
    filteredTasks,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    isSearching: searchQuery.trim().length > 0,
  };
}
