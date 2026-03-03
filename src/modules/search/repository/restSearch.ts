import { apiClient } from "@/shared/api/client";
import type { SearchResult, SearchFilters } from "../entities/Search";

export interface SearchRepo {
  search: (filters: SearchFilters) => Promise<SearchResult>;
}

export const restSearch = (): SearchRepo => ({
  search: async (filters: SearchFilters) => {
    const params = new URLSearchParams();

    if (filters.type) params.append("type", filters.type);
    if (filters.query) params.append("query", filters.query);
    if (filters.q) params.append("q", filters.q);
    if (filters.mode) params.append("mode", filters.mode);
    if (filters.category) params.append("category", filters.category);
    if (filters.categories) params.append("categories", filters.categories);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.priorities) params.append("priorities", filters.priorities);
    if (filters.minPoints !== undefined)
      params.append("minPoints", String(filters.minPoints));
    if (filters.maxPoints !== undefined)
      params.append("maxPoints", String(filters.maxPoints));
    if (filters.minRating !== undefined)
      params.append("minRating", String(filters.minRating));
    if (filters.maxRating !== undefined)
      params.append("maxRating", String(filters.maxRating));
    if (filters.minDistance !== undefined)
      params.append("minDistance", String(filters.minDistance));
    if (filters.maxDistance !== undefined)
      params.append("maxDistance", String(filters.maxDistance));
    if (filters.userLat !== undefined)
      params.append("userLat", String(filters.userLat));
    if (filters.userLng !== undefined)
      params.append("userLng", String(filters.userLng));
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    return apiClient.get<SearchResult>(`/search?${params.toString()}`);
  },
});
