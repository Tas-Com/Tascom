import type { UserProfile, HelperDetails } from '../entities/Profile';

export interface ProfileRepo {
    getProfile: (userId: string) => Promise<UserProfile>;
    updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile>;
    getHelperDetails: (userId: string) => Promise<HelperDetails>;
    giveFeedback: (userId: string, rating: number, comment: string) => Promise<void>;
}
