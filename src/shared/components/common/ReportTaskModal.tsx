import { useState } from "react";
import { Flag } from "lucide-react";
import { useReports } from "@/modules/settings/hooks/useReports";

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
  const { submitReport, isSubmitting } = useReports();

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
    const taskIdNum = parseInt(taskId, 10);
    if (isNaN(taskIdNum)) return;

    const fullReason = details ? `${reason} - ${details}` : reason;

    submitReport(
      {
        reportedId: taskIdNum,
        reason: fullReason,
        type: "TASK",
      },
      {
        onSuccess: () => {
          onClose();
          setReason("");
          setDetails("");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-200 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-100 md:max-w-110 lg:max-w-120 xl:max-w-135 2xl:max-w-150 rounded-t-2xl sm:rounded-2xl border border-[#DFDFDF] px-5 sm:px-6 py-5 sm:py-6 relative shadow-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Flag className="text-red-500" size={20} />
          </div>
        </div>

        <h2 className="text-center text-lg sm:text-xl font-bold text-text-primary">
          Report Task
        </h2>
        <p className="text-center text-xs sm:text-sm text-text-secondary mt-1 mb-4">
          Please select reason for report this task
        </p>

        <div className="space-y-2 mb-4">
          <p className="font-semibold text-xs sm:text-sm text-text-primary">
            Reason for report
          </p>

          {reasons.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="reportReason"
                value={item}
                checked={reason === item}
                onChange={() => setReason(item)}
                className="w-4 h-4 accent-brand-purple shrink-0"
              />
              <span className="text-sm text-text-primary group-hover:text-brand-purple transition-colors">
                {item}
              </span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-text-primary">
            Additional details <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-20 sm:h-24 border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all bg-white placeholder:text-text-secondary"
            placeholder="Please provide more information about the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-2 sm:py-2.5 rounded-full border border-brand-purple text-brand-purple font-semibold text-sm hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!reason || !details || isSubmitting}
            className="flex-1 py-2 sm:py-2.5 rounded-full bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
