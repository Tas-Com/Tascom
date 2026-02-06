export interface Comment {
  id: string;
  author: string;
  time: string;
  content: string;
  avatar: string;
  replyTo?: string;
}

export const mockCommentsByTask: Record<string, Comment[]> = {
  "1": [
    {
      id: "1",
      author: "John Smith",
      time: "2h ago",
      content: "This sounds perfect! I have a golden retriever who needs daily walks. What's your availability?",
      avatar: "/Alii.jpg",
    },
    {
      id: "2", 
      author: "Emma Wilson",
      time: "1h ago",
      content: "Great service! I've used Ali before and he's very reliable with pets 😊",
      avatar: "/Adaam.jpg",
      replyTo: "1",
    },
    {
      id: "3",
      author: "Ali Alya",
      time: "30m ago", 
      content: "Thank you Emma! I'm available weekdays after 5pm and weekends all day. Let me know what works for you!",
      avatar: "/Alii.jpg",
      replyTo: "2",
    }
  ],
  "2": [
    {
      id: "1",
      author: "Maria Garcia",
      time: "3h ago",
      content: "Do you provide cleaning supplies or should I prepare them?",
     avatar: "/Alii.jpg",
    },
    {
      id: "2",
      author: "Adam Ahmad", 
      time: "2h ago",
      content: "I bring all professional cleaning supplies with me. Just need access to water and electricity!",
      avatar: "/Adaam.jpg",
      replyTo: "1",
    }
  ],
  "3": [
    {
      id: "1",
      author: "David Lee",
      time: "4h ago",
      content: "Can you shop from specific stores like Whole Foods or Trader Joe's?",
      avatar: "/Adaam.jpg",
    },
    {
      id: "2",
      author: "Sarah Johnson",
      time: "3h ago", 
      content: "Absolutely! I can shop from any store you prefer. Just send me the shopping list 🛒",
      avatar: "/Alii.jpg",
      replyTo: "1",
    },
    {
      id: "3",
      author: "David Lee",
      time: "2h ago",
      content: "Perfect! I'll send you my list for Whole Foods then",
      avatar: "/Adaam.jpg",
      replyTo: "2",
    }
  ],
  "4": [
    {
      id: "1",
      author: "Lisa Chen",
      time: "5h ago",
      content: "My laptop is running very slow. Can you help with software optimization?",
      avatar: "/Alii.jpg",
    },
    {
      id: "2",
      author: "Mike Wilson",
      time: "4h ago",
      content: "Definitely! I specialize in performance optimization. Can you tell me what laptop model you have?",
      avatar: "/Adaam.jpg",
      replyTo: "1",
    },
    {
      id: "3",
      author: "Lisa Chen",
      time: "3h ago",
      content: "It's a Dell XPS 15 from 2021. Mostly used for work and some light gaming",
      avatar: "/Alii.jpg",
      replyTo: "2",
    },
    {
      id: "4",
      author: "Mike Wilson",
      time: "2h ago",
      content: "Great! That's a solid machine. I can definitely optimize it for you. When are you available?",
      avatar: "/Adaam.jpg",
      replyTo: "3",
    }
  ]
};
