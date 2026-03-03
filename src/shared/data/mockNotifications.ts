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
    id: 1,
    userName: 'Abood',
    userAvatar: '/Ali.jpg',
    time: '7:45 PM',
    message: 'Abood Altaiai like your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 2,
    userName: 'Belal',
    userAvatar: '/Adam.jpg',
    time: '7:42 PM',
    message: 'Belal Alkhaldy like your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 3,
    userName: 'Mohammed',
    userAvatar: '/Adaam.jpg',
    time: '7:30 PM',
    message: 'Ahamd Almnsori like your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 4,
    userName: 'Omar',
    userAvatar: '/Alii.jpg',
    time: '7:28 PM',
    message: 'Omar ALmajaida like your task..',
    isRead: false,
    date: 'Today',
  },
  {
    id: 5,
    userName: 'Tami',
    userAvatar: '/Ali.jpg',
    time: '7:45 PM',
    message: 'Tami Almnsori like your task',
    isRead: true,
    date: 'Yesterday',
  },
  {
    id: 6,
    userName: 'Hassn',
    userAvatar: '/Adam.jpg',
    time: '7:42 PM',
    message: 'Hassn Alkhaldy like your task',
    isRead: true,
    date: 'Yesterday',
  },
  {
    id: 7,
    userName: 'Yaser',
    userAvatar: '/Adaam.jpg',
    time: '7:42 PM',
    message: 'Yaser Altati like your task',
    isRead: true,
    date: 'Yesterday',
  },
  {
    id: 8,
    userName: 'Ali',
    userAvatar: '/Ali.jpg',
    time: '7:45 PM',
    message: 'Ali Almnsori like your task',
    isRead: true,
    date: 'Sunday',
  },
  {
    id: 9,
    userName: 'Ahmad',
    userAvatar: '/Ayan.jpg',
    time: '7:45 PM',
    message: 'Ahmad Almnsori like your task',
    isRead: true,
    date: 'Sunday',
  },
  {
    id: 10,
    userName: 'Fadi',
    userAvatar: '/Ayan.jpg',
    time: '7:45 PM',
    message: 'Fadi Almnsori like your task',
    isRead: true,
    date: 'Sunday',
  },
];
