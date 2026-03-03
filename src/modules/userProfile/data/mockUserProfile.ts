import type { User } from "@/modules/Auth/dto/AuthDto";

export const mockUserProfiles: Record<number, User> = {
  1: {
    id: 1,
    name: "Mohammed Ahmad",
    email: "mohammed@example.com",
    role: "USER",
    phoneNumber: "0591112233",
    pointsBalance: 150,
    isDeleted: false,
    ratingAvg: 4.8,
    about: "Experienced handyman specializing in furniture and home repairs.",
    skills: "Furniture Repair,Electrical,Painting",
    createdAt: new Date("2026-01-10T10:00:00Z"),
    latitude: 32.4631151,
    longitude: 35.2956228,
    location: "Nablus, Palestine",
    avatar: "/Adaam.jpg",
    tokenVersion: 0,
    assets: []
  },
  2: {
    id: 2,
    name: "Sami Khalil",
    email: "sami@example.com",
    role: "USER",
    phoneNumber: "0592223344",
    pointsBalance: 50,
    isDeleted: false,
    ratingAvg: 4.2,
    about: "Helping with moving and heavy lifting since 2020.",
    skills: "Moving,Furniture Moving,Heavy Lifting",
    createdAt: new Date("2026-02-15T12:00:00Z"),
    latitude: 31.9029,
    longitude: 35.2062,
    location: "Ramallah, Palestine",
    avatar: "/Alii.jpg",
    tokenVersion: 0,
    assets: []
  },
  3: {
    id: 3,
    name: "Layla Ali",
    email: "layla@example.com",
    role: "USER",
    phoneNumber: "0593334455",
    pointsBalance: 300,
    isDeleted: false,
    ratingAvg: 4.9,
    about: "Expert in home organization and cleaning services.",
    skills: "Cleaning,Organization,Home Styling",
    createdAt: new Date("2025-12-01T09:00:00Z"),
    latitude: 31.7683,
    longitude: 35.2137,
    location: "Jerusalem, Palestine",
    avatar: "/Ali.jpg",
    tokenVersion: 0,
    assets: []
  },
  4: {
    id: 4,
    name: "Ahmad Zaid",
    email: "ahmad@example.com",
    role: "USER",
    phoneNumber: "0594445566",
    pointsBalance: 200,
    isDeleted: false,
    ratingAvg: 4.5,
    about: "Available for delivery and grocery shopping tasks.",
    skills: "Delivery,Shopping,Personal Assistant",
    createdAt: new Date("2026-03-01T08:30:00Z"),
    latitude: 32.2211,
    longitude: 35.2544,
    location: "Jenin, Palestine",
    avatar: "/Adam.jpg",
    tokenVersion: 0,
    assets: []
  },
  5: {
    id: 5,
    name: "Omar Farooq",
    email: "omar@example.com",
    role: "USER",
    phoneNumber: "0595556677",
    pointsBalance: 0,
    isDeleted: false,
    ratingAvg: 3.5,
    about: "New to the platform, eager to help with any small tasks.",
    skills: "General Labor,Gardening",
    createdAt: new Date("2026-03-03T11:00:00Z"),
    latitude: 31.5017,
    longitude: 34.4668,
    location: "Gaza, Palestine",
    avatar: "/Adaam.jpg",
    tokenVersion: 0,
    assets: []
  },
  10: {
    id: 10,
    name: "Ali Rayyan",
    email: "s@gmail.com",
    role: "USER",
    phoneNumber: "0592548335",
    pointsBalance: 0,
    isDeleted: false,
    ratingAvg: 4.5,
    about: "I'm a reliable and friendly helper who enjoys supporting people with their daily tasks. I believe in teamwork, and doing my best to get the job done on time. Happy to help whenever needed.",
    skills: "Furniture Repair,Furniture Installation,Furniture Polishing,Furniture Moving",
    createdAt: new Date("2026-02-03T10:08:50.982Z"),
    latitude: 32.4631151,
    longitude: 35.2956228,
    location: "Ramallah, Palestine",
    avatar: "/Ali.jpg",
    tokenVersion: 0,
    assets: []
  }
};

export type TaskActivity = {
  id: number;
  title: string;
  image: string;
  link: string;
  rating?: number;
  comment?: string;
};

export const mockPostedTasks: TaskActivity[] = [
  {
    id: 1,
    title: "Moved 1-bedroom apartement",
    image: "/Ali.jpg",
    link: "/tasks/1"
  },
  {
    id: 2,
    title: "IKEA Desk Assembly",
    image: "/Ali.jpg",
    link: "/tasks/2"
  },
  {
    id: 3,
    title: "Furniture delivery assistance",
    image: "/Ali.jpg",
    link: "/tasks/3"
  }
];

export const mockRecentWork: TaskActivity[] = [
  {
    id: 4,
    title: "Moved 1-bedroom apartement",
    image: "/Ali.jpg",
    link: "/tasks/4",
    rating: 4.5,
    comment: "Excellent service!"
  },
  {
    id: 5,
    title: "IKEA Desk Assembly",
    image: "/Ali.jpg",
    link: "/tasks/5",
    rating: 4.0,
    comment: "Very quick."
  },
  {
    id: 6,
    title: "Furniture delivery assistance",
    image: "/Ali.jpg",
    link: "/tasks/6",
    rating: 3.8,
    comment: "Good job overall."
  }
];
