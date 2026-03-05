import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useChangePassword } from "../hooks/useChangePassword";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hint?: string;
  error?: string;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  hint,
  error,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text-primary">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-bg-secondary transition-all
        ${error
            ? "border-state-error ring-1 ring-state-error"
            : "border-border-default focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple"
          }`}
      >
        <Lock className="w-4 h-4 text-brand-purple shrink-0" />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="flex-1 bg-transparent outline-none text-text-primary text-sm placeholder:text-text-disable"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          {show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {error ? (
        <p className="text-xs text-state-error">{error}</p>
      ) : hint ? (
        <p className="text-xs text-text-secondary">{hint}</p>
      ) : null}
    </div>
  );
};

export const ChangePasswordPage = () => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    fieldErrors,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    handleSubmit,
  } = useChangePassword();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">
        Password
      </h1>

      <div className="bg-bg-secondary border border-border-default rounded-2xl p-8 space-y-6">
        {isSuccess && (
          <div className="bg-green-50 border border-state-success text-state-success rounded-xl px-4 py-3 text-sm font-medium">
            ✓ Password changed successfully!
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-state-error text-state-error rounded-xl px-4 py-3 text-sm font-medium">
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        <PasswordInput
          label="Old Password"
          value={oldPassword}
          onChange={setOldPassword}
          error={fieldErrors.oldPassword}
        />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          hint="Minimum 8 characters"
          error={fieldErrors.newPassword}
        />

        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          hint="Minimum 8 characters"
          error={fieldErrors.confirmPassword}
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 rounded-xl text-white font-semibold text-base transition-all
            ${isLoading
              ? "bg-brand-purple/60 cursor-not-allowed"
              : "bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] shadow-lg shadow-brand-purple/25"
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Changing...
            </span>
          ) : (
            "Change password"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
