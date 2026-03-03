export interface SearchResult {
  success: boolean;
  type: string;
  data: SearchTask[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface SearchTask {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  pointsOffered?: number;
}

export interface SearchPerson {
  id: string;
  name: string;
  avatar?: string;
  ratingAvg?: number;
}

export interface SearchFilters {
  type?: "tasks" | "people" | "all";
  query?: string;
  q?: string;
  mode?: string;
  category?: string;
  categories?: string;
  priority?: string;
  priorities?: string;
  minPoints?: number;
  maxPoints?: number;
  minRating?: number;
  maxRating?: number;
  minDistance?: number;
  maxDistance?: number;
  userLat?: number;
  userLng?: number;
  page?: number;
  limit?: number;
}
