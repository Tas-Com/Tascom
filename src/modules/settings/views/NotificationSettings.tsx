import { useNotifications } from "../hooks/useNotification";

// ========== Toggle Switch Component ==========
const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
      ${checked ? "bg-brand-purple" : "bg-gray-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
        ${checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

// ========== Checkbox Component ==========
const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex justify-center">
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors
        ${checked
          ? "bg-brand-purple border-brand-purple"
          : "bg-white border-border-default"
        }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  </div>
);

// ========== Sections Data ==========
const sections = [
  {
    title: "Task Updates",
    items: [
      { key: "newTaskNearYou", label: "New task posted near you" },
      { key: "taskAssignedToYou", label: "New task assigned to you" },
      { key: "taskMatchesSkills", label: "Task matches your skills or interests" },
    ],
  },
  {
    title: "Task Updates",
    items: [
      { key: "taskClaimed", label: "Task claimed" },
      { key: "taskCompleted", label: "Task completed" },
      { key: "taskCanceled", label: "Task canceled" },
      { key: "taskStatusChanged", label: "Task status changed" },
      { key: "taskReminder", label: "Task reminder" },
    ],
  },
  {
    title: "Messages & Mentions",
    items: [
      { key: "newMessage", label: "New message" },
      { key: "newComment", label: "New comment on your task" },
      { key: "mentionedInTask", label: "You were mentioned in a task" },
    ],
  },
  {
    title: "Points & Rewards",
    items: [
      { key: "pointsEarned", label: "Points earned" },
      { key: "ratingAfterCompletion", label: "Rating request after task completion" },
      { key: "newBadge", label: "New badge or achievement earned" },
    ],
  },
];

// ========== Main Component ==========
const NotificationSettings = () => {
  const { data, isLoading, toggleSetting } = useNotifications();

  if (isLoading) return (
    <div className="flex items-center justify-center p-12 text-text-secondary">
      Loading...
    </div>
  );
  if (!data) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">
        Notification Settings
      </h1>

      {/* ===== الجزء العلوي: Inbox + Email ===== */}
      <div className="bg-bg-secondary border border-border-default rounded-2xl overflow-hidden">

        {/* Inbox */}
        <div className="flex items-start gap-4 px-6 py-5 border-b border-border-default">
          <div className="mt-1 text-text-secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-text-primary">Inbox</p>
            <p className="text-xs text-text-secondary mt-0.5">
              You'll receive all your notifications directly inside the platform inbox.
            </p>
          </div>
          <Toggle
            checked={data.inbox?.inApp ?? true}
            onChange={() => toggleSetting("inbox", "inApp")}
          />
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 px-6 py-5">
          <div className="mt-1 text-text-secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-text-primary">Email</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Get an email summary for unread notifications, grouped and sent based on priority.
            </p>
          </div>
          <Toggle
            checked={data.email?.email ?? false}
            onChange={() => toggleSetting("email", "email")}
          />
        </div>
      </div>

      {/* ===== الجدول: Task & Community Notifications ===== */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Task & Community Notifications
        </h2>

        <div className="bg-bg-secondary border border-border-default rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-4 bg-brand-purple text-white text-sm font-medium">
            <div className="px-4 py-3">Notification Type</div>
            <div className="px-4 py-3 text-center border-r border-white/20">In-App</div>
            <div className="px-4 py-3 text-center border-r border-white/20">Email</div>
            <div className="px-4 py-3 text-center">Push</div>
          </div>

          {/* Sections */}
          {sections.map((section, i) => (
            <div key={`${section.title}-${i}`}>

              {/* Section Title */}
              <div className="bg-purple-50 px-4 py-2 text-sm font-semibold text-brand-purple border-t border-border-default">
                {section.title}
              </div>

              {/* Items */}
              {section.items.map((item, idx) => (
                <div
                  key={item.key}
                  className={`grid grid-cols-4 items-center px-4 py-3
                    ${idx !== section.items.length - 1 ? "border-b border-dashed border-border-default" : ""}`}
                >
                  <div className="text-sm text-text-primary">{item.label}</div>

                  {(["inApp", "email", "push"] as const).map((channel) => (
                    <Checkbox
                      key={channel}
                      checked={data[item.key]?.[channel] ?? false}
                      onChange={() => toggleSetting(item.key, channel)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;