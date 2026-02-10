import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  avatar: string;
  replyTo?: string;
}

interface CommentsState {
  comments: Record<string, Comment[]>;
  addComment: (
    taskId: string,
    content: string,
    author: string,
    avatar: string,
    replyTo?: string,
  ) => void;
  getComments: (taskId: string) => Comment[];
  getCommentsCount: (taskId: string) => number;
}

export const useCommentsStore = create<CommentsState>()(
  persist(
    (set, get) => ({
      comments: {},

      addComment: (
        taskId: string,
        content: string,
        author: string,
        avatar: string,
        replyTo?: string,
      ) => {
        set((state) => {
          const newComment: Comment = {
            id: Date.now().toString(),
            author,
            content,
            time: "Just now",
            avatar,
            replyTo,
          };

          const taskComments = state.comments[taskId] || [];
          const updatedComments = {
            ...state.comments,
            [taskId]: [...taskComments, newComment],
          };

          return {
            comments: updatedComments,
          };
        });
      },

      getComments: (taskId: string) => {
        const state = get();
        return state.comments[taskId] || [];
      },

      getCommentsCount: (taskId: string) => {
        const state = get();
        const comments = state.comments[taskId] || [];
        return comments.filter((comment) => !comment.replyTo).length;
      },
    }),
    {
      name: "comments-storage",
    },
  ),
);
