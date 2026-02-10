import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikesState {
  likedTasks: Set<string>;
  taskLikes: Record<string, number>;
  toggleLike: (taskId: string, currentLikes: number) => void;
  isLiked: (taskId: string) => boolean;
  getLikes: (taskId: string) => number;
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      likedTasks: new Set(),
      taskLikes: {},

      toggleLike: (taskId: string, currentLikes: number) => {
        set((state) => {
          const currentLikedTasks =
            state.likedTasks instanceof Set
              ? state.likedTasks
              : new Set<string>();
          const newLikedTasks = new Set<string>(currentLikedTasks);
          const newTaskLikes = { ...state.taskLikes };

          if (newLikedTasks.has(taskId)) {
            newLikedTasks.delete(taskId);
            newTaskLikes[taskId] = Math.max(
              0,
              (newTaskLikes[taskId] || currentLikes) - 1,
            );
          } else {
            newLikedTasks.add(taskId);
            newTaskLikes[taskId] = (newTaskLikes[taskId] || currentLikes) + 1;
          }

          return {
            likedTasks: newLikedTasks,
            taskLikes: newTaskLikes,
          };
        });
      },

      isLiked: (taskId: string) => {
        const state = get();
        const likedTasksSet =
          state.likedTasks instanceof Set ? state.likedTasks : new Set();
        return likedTasksSet.has(taskId);
      },

      getLikes: (taskId: string) => {
        const state = get();
        return state.taskLikes[taskId] || 0;
      },
    }),
    {
      name: "likes-storage",
      partialize: (state) => ({
        likedTasks: Array.from(state.likedTasks),
        taskLikes: state.taskLikes,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.likedTasks)) {
          state.likedTasks = new Set(state.likedTasks);
        }
      },
    },
  ),
);
