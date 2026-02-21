import { create } from "zustand";

interface Notification {
  id: string;
  taskId: string;
  message: string;
  read: boolean;
}

interface NotificationsStore {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),
}));
