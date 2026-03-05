export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  pointsOffered?: number;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  creatorId: string;
  latitude: number;
  longitude: number;
  deadline?: string;
  assets?: Asset[];
  creator?: User;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isCompleted?: boolean;
  claimerId?: string;
  claimer?: User;
  numOfLikes?: number;
  claims?: Claim[];
  isExpired?: boolean;
  remainingHours?: number;
  remainingDays?: number;
  distance?: number;
  rating?: number;
}

export interface Asset {
  id: string;
  url: string;
  fileType: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string | null;
  assets?: Asset[];
  rating?: number;
  ratingAvg?: number;
}

export interface Claim {
  id: string;
  taskId: string;
  claimantId: string;
  status: string;
  claimedAt: string;
}
