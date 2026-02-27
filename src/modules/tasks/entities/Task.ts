export interface Task {
    id: number;
    title: string;
    description: string;
    points: number;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    location?: string;
    creatorId: number;
    latitude: number;
    longitude: number;
    assets?: {
        id: string;
        url: string;
        fileType: string;
    }[];
}
