export interface SearchFilters {
  type: "tasks" | "people";
  query?: string;
  q?: string;
  mode?: string;
  category?: string;
  categories?: string;
  priority?: string;
  priorities?: string;
  minPoints?: number;
  maxPoints?: number;
  minDistance?: number;
  maxDistance?: number;
  minRating?: number;
  maxRating?: number;
  userLat?: number;
  userLng?: number;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  success: boolean;
  type: "tasks" | "people";
  data: SearchTaskResult[] | SearchPersonResult[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
}

export interface SearchPersonResult {
  id: string;
  name: string;
  avatar?: string | null;
  ratingAvg?: number;
  rating?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  about?: string;
  skills?: string;
  assets?: SearchAsset[];
  completedTasks?: number;
  pointsBalance?: number;
}

export interface SearchTaskResult {
  id: string;
  creatorId: string;
  assigneeId: string | null;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  deadline?: string;
  pointsOffered?: number;
  points?: number;
  status: string;
  priority: string;
  category: string;
  numOfLikes?: number;
  createdAt: string;
  completedAt?: string | null;
  updatedAt: string;
  isDeleted: boolean;
  assets?: SearchAsset[];
  creator?: SearchUser;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isCompleted?: boolean;
  claimerId?: string;
  claimantId?: string;
  claimer?: SearchUser;
  isExpired?: boolean;
  remainingHours?: number;
  remainingDays?: number;
  distance?: number;
  rating?: number;
}

export interface SearchAsset {
  id: string;
  url: string;
  fileType: string;
  storageProviderName?: string;
  fileId?: string;
  fileSizeInKB?: number;
  ownerId?: string;
  taskId?: string;
  createdAt?: string;
}

export interface SearchUser {
  id: string;
  name: string;
  avatar?: string | null;
  assets?: SearchAsset[];
  rating?: number;
  ratingAvg?: number;
  email?: string;
  phoneNumber?: string;
  role?: string;
  customerStatus?: string;
  about?: string;
  skills?: string;
  gender?: string;
  lastActiveAt?: string;
  pointsBalance?: number;
  latitude?: number;
  longitude?: number;
  location?: string;
}
