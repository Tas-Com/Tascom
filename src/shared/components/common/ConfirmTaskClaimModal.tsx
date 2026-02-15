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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-bg-secondary w-[420px] rounded-2xl px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bg-card-hover color-brand-purple">
          <Check size={28} className="text-icon-default color-brand-purple" />
        </div>

        <h3 className="text-h5-2 mb-2">Confirm Task Claim</h3>

        <p className="text-caption1 text-text-secondary mb-8">
          Are you sure you want to claim this task?
          <br />
          Once confirmed, the task will be assigned to you.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-border-default py-2 text-btn-s text-text-primary"
          >
            Ignore
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-brand-purple py-2 text-btn-s text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
