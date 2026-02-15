import { useState } from "react";
import { Flag } from "lucide-react";
import { useNotificationsStore } from "../../../store/notificationsStore";

interface ReportTaskModalProps {
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportTaskModal = ({
  taskId,
  isOpen,
  onClose,
}: ReportTaskModalProps) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { addNotification } = useNotificationsStore();

  if (!isOpen) return null;

  const reasons = [
    "Spam or Misleading Information",
    "Inappropriate or Offensive Content",
    "Harassment or Bullying",
    "Service Quality Issues",
    "Delay or Lack of Commitment",
    "Other",
  ];

  const handleSubmit = () => {
    addNotification({
      id: crypto.randomUUID(),
      taskId,
      message: `Task reported: ${reason}${details ? " - " + details : ""}`,
      read: false,
    });
    onClose();
    setReason("");
    setDetails("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl px-8 py-6 relative">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <Flag className="text-red-500" size={28} />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-primary text-purple-900">
          Report Task
        </h2>
        <p className="text-center text-sm text-text-secondary mt-1 mb-6">
          Please select reason for report this task
        </p>

        <div className="space-y-3">
          <p className="font-medium text-primary">Reason for report</p>

          {reasons.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="reportReason"
                value={item}
                checked={reason === item}
                onChange={() => setReason(item)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-sm text-text-primary">{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-primary">
            Additional details <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-28 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Please provide more information about the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-full border border-purple-500 text-purple-600 font-medium hover:bg-purple-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!reason || !details}
            className="w-1/2 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
