import { useState } from "react";
import { useDeleteAccount } from "../hooks/DeleteAccount";
import { useRouter } from '@tanstack/react-router';

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();    

  const { mutate, isPending } = useDeleteAccount();

  const isValid = confirmText === "DELETE";

const handleConfirm = () => {
  mutate(undefined, {
    onSuccess: () => {
      setOpenModal(false);      // ← أغلق المودال أول
      setTimeout(() => {        // ← انتظر React تنظف الـ DOM
        router.navigate({ to: "/login" });
      }, 100);
    },
  });
};
  return (
    <div className="max-w-xl space-y-6">

      <h2 className="text-2xl font-bold text-text-primary">Delete Account</h2>

      <p className="text-sm text-text-secondary">
        Permanently remove your account and data from Tascom.
      </p>

      {/* Warning Box */}
      <div className="bg-red-50 border-l-4 border-state-error p-4 rounded-md flex gap-3">
        <span className="text-state-error mt-0.5">⚠️</span>
        <div>
          <p className="text-state-error font-semibold text-sm">
            Warning: This action is permanent
          </p>
          <p className="text-sm text-state-error/80 mt-1">
            Once you delete your account, all of your data will be permanently lost. Please be certain.
          </p>
        </div>
      </div>

      {/* Points — زي الصورة بالضبط */}
      <ul className="space-y-3">
        {[
          "Your public profile will be immediately deactivated.",
          "All your earned points will be lost.",
          "Your active tasks will be canceled automatically.",
          "You will not receive any further notifications related to your account.",
        ].map((text) => (
          <li key={text} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="text-gray-400 mt-0.5">✓</span>
            {text}
          </li>
        ))}
      </ul>

      {/* Confirm input */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-text-primary">
          To confirm, type "DELETE" below
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
          className="w-full border border-border-default rounded-xl px-4 py-2.5 text-sm outline-none focus:border-state-error focus:ring-1 focus:ring-state-error transition"
        />
      </div>

      {/* ✅ المشكلة الثانية — أضفنا cursor-pointer على الزر الشغّال */}
      <button
        disabled={!isValid}
        onClick={() => setOpenModal(true)}
        className={`w-full py-3 rounded-xl text-white font-semibold text-base transition-all
          ${isValid
            ? "bg-brand-purple hover:bg-brand-purple/90 cursor-pointer active:scale-[0.98] shadow-lg shadow-brand-purple/25"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        Delete Account
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center space-y-4 shadow-xl">

            {/* أيقونة المودال */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto">
              <svg className="w-7 h-7 text-state-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-text-primary">Delete account</h3>

            <p className="text-sm text-text-secondary">
              Are you sure you want to delete this account?
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 border border-border-default rounded-full py-2.5 text-sm font-medium text-text-primary hover:bg-gray-50 cursor-pointer transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isPending}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium text-white transition
                  ${isPending
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-state-error hover:bg-red-700 cursor-pointer"
                  }`}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
