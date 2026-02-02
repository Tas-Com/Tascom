export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: Date;
  rating: number;
  reviewCount: number;
}

export interface HelperDetails {
  completedTasks: number;
  skills: string[];
  badges: string[];
}
