// settings/hooks/useNotifications.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationSettings,
  updateNotificationSettings,

} from "../apis/notificationsApi";
import type { NotificationSettingsType } from "../apis/notificationsApi";
export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationSettings,
  });

  const mutation = useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (newData) => {
      queryClient.setQueryData(["notifications"], newData);
    },
  });

  const toggleSetting = (
    key: string,
    channel: "inApp" | "email" | "push"
  ) => {
    if (!data) return;

    const updated: NotificationSettingsType = {
      ...data,
      [key]: {
        ...data[key],
        [channel]: !data[key][channel],
      },
    };

    mutation.mutate(updated);
  };

  return {
    data,
    isLoading,
    toggleSetting,
    isUpdating: mutation.isPending,
  };
};
