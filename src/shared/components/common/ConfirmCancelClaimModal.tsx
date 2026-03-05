import { X } from "lucide-react";

interface ConfirmCancelClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmCancelClaimModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmCancelClaimModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      style={{ backgroundColor: "#20202059" }}
    >
      <div
        className="bg-white text-center flex flex-col items-center"
        style={{
          width: 509,
          maxWidth: "100%",
          borderRadius: 32,
          padding: 32,
          gap: 24,
          boxShadow: "0px 4px 10.1px 0px #8E8E8E17",
        }}
      >
        {/* Close icon */}
        <button onClick={onClose} className="self-center cursor-pointer">
          <X size={32} style={{ color: "#6B39F4" }} />
        </button>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
          Confirm Cancel Claim
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-80 mx-auto">
          Are you sure you want to cancel your claim? Once confirmed, your claim
          will be removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-2 border-gray-200 text-sm sm:text-base font-semibold text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Ignore
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-full bg-brand-purple text-sm sm:text-base font-semibold text-white hover:bg-purple-700 transition-colors cursor-pointer"
          >
            Cancel claim
          </button>
        </div>
      </div>
    </div>
  );
}
