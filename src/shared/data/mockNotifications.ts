export type Notification = {
  id: number;
  userName: string;
  userAvatar: string;
  time: string;
  message: string;
  isRead: boolean;
  date: string; // Used for grouping
};

export const mockNotifications: Notification[] = [
  {
    id: 1, // Mohammed Ahmad
    userName: 'Mohammed Ahmad',
    userAvatar: '/Adaam.jpg',
    time: '7:45 PM',
    message: 'Mohammed Ahmad liked your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 2, // Sami Khalil
    userName: 'Sami Khalil',
    userAvatar: '/Alii.jpg',
    time: '7:42 PM',
    message: 'Sami Khalil liked your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 3, // Layla Ali
    userName: 'Layla Ali',
    userAvatar: '/Ali.jpg',
    time: '7:30 PM',
    message: 'Layla Ali liked your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 4, // Ahmad Zaid
    userName: 'Ahmad Zaid',
    userAvatar: '/Adam.jpg',
    time: '7:28 PM',
    message: 'Ahmad Zaid liked your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 5, // Omar Farooq
    userName: 'Omar Farooq',
    userAvatar: '/Adaam.jpg',
    time: '7:45 PM',
    message: 'Omar Farooq liked your task',
    isRead: true,
    date: 'Yesterday',
  },
  {
    id: 10, // Ali Rayyan
    userName: 'Ali Rayyan',
    userAvatar: '/Ali.jpg',
    time: '7:42 PM',
    message: 'Ali Rayyan liked your task',
    isRead: true,
    date: 'Yesterday',
  },
];
