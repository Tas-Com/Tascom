import { useQuery } from "@tanstack/react-query";
import { restSearch } from "../repository/restSearch";
import type { SearchFilters } from "../entities/Search";

const searchRepo = restSearch();

export const useSearch = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ["search", filters],
    queryFn: () => searchRepo.search(filters),
    enabled: !!filters.query && filters.query.length >= 2,
  });
};
