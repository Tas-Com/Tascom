import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavesState {
  savedTasks: Set<string>;
  toggleSave: (taskId: string) => void;
  setSaved: (taskId: string) => void;
  removeSaved: (taskId: string) => void;
  isSaved: (taskId: string) => boolean;
  syncFromApi: (taskIds: string[]) => void;
}

export const useSavesStore = create<SavesState>()(
  persist(
    (set, get) => ({
      savedTasks: new Set(),

      toggleSave: (taskId: string) => {
        set((state) => {
          const current =
            state.savedTasks instanceof Set
              ? state.savedTasks
              : new Set<string>();
          const next = new Set<string>(current);

          if (next.has(taskId)) {
            next.delete(taskId);
          } else {
            next.add(taskId);
          }

          return { savedTasks: next };
        });
      },

      setSaved: (taskId: string) => {
        set((state) => {
          const current =
            state.savedTasks instanceof Set
              ? state.savedTasks
              : new Set<string>();
          const next = new Set<string>(current);
          next.add(taskId);
          return { savedTasks: next };
        });
      },

      removeSaved: (taskId: string) => {
        set((state) => {
          const current =
            state.savedTasks instanceof Set
              ? state.savedTasks
              : new Set<string>();
          const next = new Set<string>(current);
          next.delete(taskId);
          return { savedTasks: next };
        });
      },

      isSaved: (taskId: string) => {
        const state = get();
        const savedSet =
          state.savedTasks instanceof Set ? state.savedTasks : new Set();
        return savedSet.has(taskId);
      },

      syncFromApi: (taskIds: string[]) => {
        set({ savedTasks: new Set(taskIds) });
      },
    }),
    {
      name: "saves-storage",
      partialize: (state) => ({
        savedTasks: Array.from(state.savedTasks),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.savedTasks)) {
          state.savedTasks = new Set(state.savedTasks);
        }
      },
    },
  ),
);
