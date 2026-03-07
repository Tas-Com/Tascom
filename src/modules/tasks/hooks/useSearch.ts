import { useQuery } from "@tanstack/react-query";
import { restSearch } from "../repository/restSearch";
import type { SearchFilters } from "../repository/SearchDtos";

const searchRepo = restSearch();

export const useSearchTasks = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ["searchTasks", filters],
    queryFn: () => searchRepo.search(filters),
    enabled: !!filters.query || filters.type === "tasks",
  });
};

export const useSearchPeople = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ["searchPeople", filters],
    queryFn: () => searchRepo.search(filters),
    enabled: !!filters.query || filters.type === "people",
  });
};
