
import type { ProfileRepo } from './ProfileRepo';
import type { UserProfile, HelperDetails } from '../entities/Profile';

const parsedLocalProfile = localStorage.getItem('mockProfile');
const localProfile = parsedLocalProfile ? JSON.parse(parsedLocalProfile) : null;

const MOCK_PROFILE: UserProfile = localProfile || {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=1',
    bio: 'Experienced software engineer offering swift and clean code solutions.',
    location: 'San Francisco, CA',
    joinDate: new Date('2024-01-15').toISOString(),
    rating: 4.8,
    reviewCount: 156,
};

const MOCK_HELPER_DETAILS: HelperDetails = {
    completedTasks: 42,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Go'],
    badges: ['Top Rated', 'Quick Responder', 'Verified Pro'],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockProfile = (): ProfileRepo => ({
    getProfile: async (userId) => {
        await delay(500);
        console.log(`[Mock] Fetching profile for ${userId}`);
        return { ...MOCK_PROFILE, id: userId };
    },

    updateProfile: async (data) => {
        await delay(800);
        console.log('[Mock] Updating profile', data);
        const updated = { ...MOCK_PROFILE, ...data };
        localStorage.setItem('mockProfile', JSON.stringify(updated));
        Object.assign(MOCK_PROFILE, updated);
        return updated;
    },

    getHelperDetails: async (userId) => {
        await delay(400);
        console.log(`[Mock] Fetching helper details for ${userId}`);
        return MOCK_HELPER_DETAILS;
    },

    giveFeedback: async (userId, rating, comment) => {
        await delay(600);
        console.log(`[Mock] Feedback for ${userId}: ${rating} stars - "${comment}"`);
    },
});
