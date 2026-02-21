// settings/apis/notifications.api.ts

export type NotificationChannel = {
  inApp: boolean;
  email: boolean;
  push: boolean;
};

export type NotificationSettingsType = {
  [key: string]: NotificationChannel;
};

const mockData: NotificationSettingsType = {

inbox: { inApp: true, email: false, push: false },
  email: { inApp: false, email: true, push: false }, 


  newTaskNearYou: { inApp: true, email: false, push: true },
  taskAssignedToYou: { inApp: true, email: true, push: true },
  taskMatchesSkills: { inApp: true, email: false, push: true },

  taskClaimed: { inApp: true, email: false, push: true },
  taskCompleted: { inApp: true, email: false, push: true },
  taskCanceled: { inApp: false, email: false, push: true },
  taskStatusChanged: { inApp: true, email: false, push: false },
  taskReminder: { inApp: true, email: false, push: true },

  newMessage: { inApp: true, email: false, push: true },
  newComment: { inApp: true, email: false, push: false },
  mentionedInTask: { inApp: true, email: false, push: true },

  pointsEarned: { inApp: true, email: false, push: true },
  ratingAfterCompletion: { inApp: true, email: false, push: true },
  newBadge: { inApp: true, email: false, push: true },
};

export const getNotificationSettings =
  async (): Promise<NotificationSettingsType> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 500);
    });
  };

export const updateNotificationSettings = async (
  data: NotificationSettingsType
): Promise<NotificationSettingsType> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};
