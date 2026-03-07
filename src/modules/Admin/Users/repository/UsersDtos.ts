export interface AdminUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  customerStatus: 'ACTIVE' | 'BANNED' | 'SUSPENDED';
  pointsBalance: number;
  ratingAvg: number;
  avatar: string | null;
  country: string;
  createdAt: string;
  lastActiveAt: string;
  location: string | null;
}

export interface ExportUsersDto {
  ids?: number[];
  search?: string;
  role?: 'USER' | 'ADMIN';
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
  maxRows?: number;
}

export interface UserStatsResponse {
  points: number;
  posts: number;
  claimed: number;
  completed: number;
  active: number;
}
