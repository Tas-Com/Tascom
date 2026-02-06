export interface MockTask {
  id: string;
  taskerName: string;
  rating: number;
  taskTitle: string;
  description: string;
  categories: string[];
  location: string;
  duration: string;
  points: number;
  imageUrl: string;
  likes: number;
  comments: number;
  postedTime: string;
  taskerImage: string;
  priority: string;
}

export const mockTasks: MockTask[] = [
  {
    id: "1",
    taskerName: "Ali Alya",
    rating: 4.8,
    taskTitle: "Dog Walking Service",
    description:
      "Professional dog walking service for busy pet owners. I'll take your furry friend for a 30-minute walk in the park.",
    categories: ["Pet Care", "Errand"],
    location: "Downtown District",
    duration: "30 min",
    points: 50,
    imageUrl: "/cat.jpg",
    likes: 24,
    comments: 8,
    postedTime: "2 hours ago",
    taskerImage: "/Alii.jpg",
    priority: "High",
  },
  {
    id: "2",
    taskerName: "Adam Ahmad",
    rating: 4.5,
    taskTitle: "Home Cleaning",
    description:
      "Thorough home cleaning service including dusting, vacuuming, and kitchen/bathroom sanitation.",
    categories: ["Home Services", "Errand"],
    location: "West Side",
    duration: "2 hours",
    points: 120,
    imageUrl: "/home.jpg",
    likes: 18,
    comments: 5,
    postedTime: "4 hours ago",
    taskerImage: "/Adaam.jpg",
    priority: "Medium",
  },
  {
    id: "3",
    taskerName: "Sarah Johnson",
    rating: 4.9,
    taskTitle: "Grocery Shopping",
    description:
      "I'll do your grocery shopping and deliver everything to your doorstep. Fresh produce and household items.",
    categories: ["Errand", "Transportation"],
    location: "City Center",
    duration: "1 hour",
    points: 80,
    imageUrl: "/cat.jpg",
    likes: 32,
    comments: 12,
    postedTime: "6 hours ago",
    taskerImage: "/Alii.jpg",
    priority: "Low",
  },
  {
    id: "4",
    taskerName: "Mike Wilson",
    rating: 4.7,
    taskTitle: "Computer Repair",
    description:
      "Professional computer troubleshooting and repair services for both hardware and software issues.",
    categories: ["Repairs", "Tutoring"],
    location: "Tech Hub",
    duration: "45 min",
    points: 90,
    imageUrl: "/home.jpg",
    likes: 28,
    comments: 9,
    postedTime: "8 hours ago",
    taskerImage: "/Adaam.jpg",
    priority: "High",
  },
];
