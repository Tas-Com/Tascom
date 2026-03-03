export type ChatMessage = {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isSentByMe: boolean;
  status: "seen" | "delivered" | "sent";
  date?: string;
};

export type ChatConversation = {
  id: number;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  status: "seen" | "new" | "typing";
  isActive?: boolean;
};

export const mockConversations: ChatConversation[] = [
  {
    id: 1,
    userName: "Belal",
    userAvatar: "/Adam.jpg",
    lastMessage: "Hello, I'm Belal! 👋\nI'm reaching out to discuss the upcoming project milestones.",
    time: "7:45 PM",
    unreadCount: 2,
    status: "new",
    isActive: true,
  },
  {
    id: 2,
    userName: "Mohammed",
    userAvatar: "/Adaam.jpg",
    lastMessage: "Hey there! I've reviewed the documents you sent.\nEverything looks good for the launch.",
    time: "7:41 PM",
    status: "seen",
  },
  {
    id: 3,
    userName: "Ali",
    userAvatar: "/Ali.jpg",
    lastMessage: "Hello, I'm Ali.\nCould we possibly reschedule our meeting for tomorrow morning?",
    time: "7:40 PM",
    status: "seen",
  },
  {
    id: 4,
    userName: "Ahmad",
    userAvatar: "/Alii.jpg",
    lastMessage: "Hi! I'm Ahmad from the design team.\nI've attached the latest UI mocks for your review.",
    time: "7:30 PM",
    status: "seen",
  },
  {
    id: 5,
    userName: "Abood",
    userAvatar: "/Ali.jpg",
    lastMessage: "Hi, I'm Abood.\nJust checking in to see if you have any updates on the task.",
    time: "7:40 PM",
    status: "seen",
  },
];

export const mockMessagesByConversation: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      text: "Hello, I'm Belal! 👋\nI'm reaching out to discuss the upcoming project milestones and see if we're on track.",
      time: "10:24 PM",
      isSentByMe: false,
      status: "seen",
      date: "Today",
    },
    {
      id: 2,
      senderId: 0,
      text: "Hey Belal! That sounds like a great plan.\nI'll prepare the status report for our call.",
      time: "10:25 PM",
      isSentByMe: true,
      status: "seen",
    },
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      text: "Hey there! I'm Mohammed.\nI've reviewed the latest documents you sent over, and I have a few suggestions.",
      time: "9:15 PM",
      isSentByMe: false,
      status: "seen",
      date: "Yesterday",
    },
    {
      id: 2,
      senderId: 0,
      text: "Thanks Mohammed! I'm looking forward to your feedback.\nLet's discuss them in the morning.",
      time: "9:20 PM",
      isSentByMe: true,
      status: "seen",
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      text: "Hello, I'm Ali.\nCould we possibly reschedule our meeting for tomorrow morning? Something urgent came up.",
      time: "8:00 PM",
      isSentByMe: false,
      status: "seen",
      date: "Monday",
    },
    {
      id: 2,
      senderId: 0,
      text: "No problem at all, Ali.\nTomorrow morning at 10 AM works for me. Hope everything is okay!",
      time: "8:05 PM",
      isSentByMe: true,
      status: "seen",
    },
  ],
  4: [
    {
      id: 1,
      senderId: 4,
      text: "Hi! I'm Ahmad from the design team.\nI've attached the latest UI mocks for your review. Let me know what you think!",
      time: "7:30 PM",
      isSentByMe: false,
      status: "seen",
      date: "Sunday",
    },
    {
      id: 2,
      senderId: 0,
      text: "These look amazing, Ahmad!\nThe new color palette really makes the interface pop. Great job.",
      time: "7:45 PM",
      isSentByMe: true,
      status: "seen",
    },
  ],
  5: [
    {
      id: 1,
      senderId: 3,
      text: "Hi, I'm Abood.\nJust checking in to see if you have any updates on the task we discussed earlier.",
      time: "6:20 PM",
      isSentByMe: false,
      status: "seen",
      date: "Sat 4:00 PM",
    },
    {
      id: 2,
      senderId: 0,
      text: "Working on it right now, Abood!\nI should have something concrete for you by the end of the day.",
      time: "6:30 PM",
      isSentByMe: true,
      status: "seen",
    },
  ],
};
