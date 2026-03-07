import { apiClient } from "@/shared/api/client";
import type { SearchFilters, SearchResponse } from "./SearchDtos";

export interface SearchRepo {
  search: (filters: SearchFilters) => Promise<SearchResponse>;
}

export const restSearch = (): SearchRepo => ({
  search: async (filters: SearchFilters) => {
    const params = buildSearchParams(filters);
    return apiClient.get<SearchResponse>("/search", { params });
  },
});

function buildSearchParams(
  filters: SearchFilters,
): Record<string, string | number | undefined> {
  const params: Record<string, string | number | undefined> = {
    type: filters.type,
  };

  if (filters.query) params.query = filters.query;
  if (filters.q) params.q = filters.q;
  if (filters.mode) params.mode = filters.mode;
  if (filters.category) params.category = filters.category;
  if (filters.categories) params.categories = filters.categories;
  if (filters.priority) params.priority = filters.priority;
  if (filters.priorities) params.priorities = filters.priorities;
  if (filters.minPoints !== undefined) params.minPoints = filters.minPoints;
  if (filters.maxPoints !== undefined) params.maxPoints = filters.maxPoints;
  if (filters.minRating !== undefined) params.minRating = filters.minRating;
  if (filters.maxRating !== undefined) params.maxRating = filters.maxRating;
  if (filters.minDistance !== undefined)
    params.minDistance = filters.minDistance;
  if (filters.maxDistance !== undefined)
    params.maxDistance = filters.maxDistance;
  if (filters.userLat !== undefined) params.userLat = filters.userLat;
  if (filters.userLng !== undefined) params.userLng = filters.userLng;
  if (filters.page !== undefined) params.page = filters.page;
  if (filters.limit !== undefined) params.limit = filters.limit;

  return params;
}
