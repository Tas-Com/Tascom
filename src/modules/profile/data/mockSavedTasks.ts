import type { SavedTask } from "../components/SavedTaskCard";

export const mockSavedTasks: SavedTask[] = [
    {
        id: "1",
        taskerName: "Adam Ahmad",
        taskerImage: "/Adaam.jpg",
        rating: 4.5,
        postedTime: "3h ago",
        taskTitle: "Need Someone to Take Care of My Cat",
        description:
            "I need someone to take care of my cat for two hours while I'm out. The location is in the International Garden area. The task includes keeping an eye on my cat, making sure it's comfortable, and giving it some attention during this time.",
        imageUrl: "/cat.jpg",
    },
    {
        id: "2",
        taskerName: "Ali Alya",
        taskerImage: "/Alii.jpg",
        rating: 4.0,
        postedTime: "7h ago",
        taskTitle: "Gardening Help Needed for My Backyard",
        description:
            "I need assistance with my backyard garden. Tasks include planting new flowers, trimming bushes, and general maintenance to keep the area neat and healthy. I'm looking for someone who has basic gardening experience.",
        imageUrl: "/home.jpg",
    },
    {
        id: "3",
        taskerName: "Sarah Johnson",
        taskerImage: "/Alii.jpg",
        rating: 4.8,
        postedTime: "2h ago",
        taskTitle: "Grocery Shopping and Delivery",
        description:
            "I'm searching for someone to help with grocery shopping and delivery. The task involves picking up items from a nearby store and delivering them to my home. Must be reliable and able to handle fresh produce carefully.",
        imageUrl: "/cat.jpg",
    },
];
