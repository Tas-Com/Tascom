import { Check } from "lucide-react";

interface ConfirmTaskClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmTaskClaimModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmTaskClaimModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-100 sm:max-w-105 rounded-2xl px-6 sm:px-10 py-8 sm:py-10 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
          <Check size={32} className="text-brand-purple" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          Confirm Task Claim
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary mb-8 leading-relaxed max-w-75 mx-auto">
          Are you sure you want to claim this task?
          Once confirmed, the task will be assigned to you.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-2 border-gray-200 text-sm sm:text-base font-semibold text-text-primary hover:bg-gray-50 transition-colors"
          >
            Ignore
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-full bg-brand-purple text-sm sm:text-base font-semibold text-white hover:bg-purple-700 transition-colors"
          >
            Accepts
          </button>
        </div>
      </div>
    </div>
  );
}
