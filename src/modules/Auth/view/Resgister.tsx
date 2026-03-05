import { Button, Input } from "../../../shared/components/ui";
import { Link } from "@tanstack/react-router";
import {
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRegisterForm } from "../hook/useRegisterForm";

export default function RegisterPage() {
  const {
    form: {
      register,
      formState: { errors, isValid },
    },
    onSubmit,
    isSubmitting,
    showSuccess,
    isLocating,
    // userLocation,
    locationError,
  } = useRegisterForm();

  return (
    <div className="w-full flex flex-col justify-center h-full">
      <div className="text-center mb-1 lg:mb-2">
        <h1 className="text-[20px] md:text-[24px] xl:text-[30px] 2xl:text-[36px] font-bold text-brand-purple mb-1">
          Welcome to Tascom
        </h1>
        <p className="text-[11px] lg:text-[12px] 2xl:text-[14px] text-text-secondary">
          Connect, collaborate, and get things done
        </p>
      </div>

      {showSuccess && (
        <div className="bg-state-success/10 border border-state-success/30 p-4 rounded-xl flex items-center gap-3 mb-6 animate-in slide-in-from-top-5">
          <CheckCircle2 className="w-6 h-6 text-state-success shrink-0" />
          <div>
            <p className="text-caption1 text-state-success font-semibold">
              Registration Successful!
            </p>
            <p className="text-caption2 text-text-secondary">
              Redirecting to home page...
            </p>
          </div>
        </div>
      )}

      {errors.root && (
        <div className="bg-state-error/10 border border-state-error/30 p-3 rounded-xl flex items-center gap-3 mb-4 animate-in shake">
          <AlertCircle className="w-5 h-5 text-state-error shrink-0" />
          <p className="text-[12px] 2xl:text-[14px] text-state-error font-medium">
            {errors.root.message}
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-1.5 md:space-y-2 2xl:space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[12px] md:text-[13px] 2xl:text-[16px] font-semibold text-text-primary px-1">
            Name
          </label>
          <div className="relative">
            <Input
              {...register("name")}
              placeholder="Your Full Name"
              className={`pl-10 h-9 md:h-10 2xl:h-12 bg-white rounded-xl border transition-all text-[12px] lg:text-[13px] 2xl:text-[16px] ${errors.name
                ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                : "border-border-default focus:border-brand-purple"
                }`}
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-brand-purple/70" />
          </div>
          {errors.name && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[11px] 2xl:text-[12px]">{errors.name.message}</p>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-[12px] md:text-[13px] 2xl:text-[16px] font-semibold text-text-primary px-1">
            Phone Number
          </label>
          <div className="relative">
            <Input
              {...register("phoneNumber")}
              type="tel"
              placeholder="059-000-0000"
              className={`pl-10 pr-24 h-9 md:h-10 2xl:h-12 bg-white rounded-xl border transition-all text-[12px] lg:text-[13px] 2xl:text-[16px] ${errors.phoneNumber
                ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                : "border-border-default focus:border-brand-purple"
                }`}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-brand-purple/70" />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
              <select
                {...register("countryCode")}
                className="h-7 md:h-8 2xl:h-10 text-[11px] lg:text-[12px] 2xl:text-[14px] bg-transparent border-none focus:ring-0 text-text-secondary font-medium cursor-pointer outline-none"
              >
                <option value="+970">🇵🇸</option>
                <option value="+972">🇮🇱</option>
              </select>
            </div>
          </div>
          {errors.phoneNumber && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[11px] 2xl:text-[12px]">{errors.phoneNumber.message}</p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-[12px] md:text-[13px] 2xl:text-[16px] font-semibold text-text-primary px-1">
            Email
          </label>
          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              placeholder="placeholder@gmail.com"
              className={`pl-10 h-9 md:h-10 2xl:h-12 bg-white rounded-xl border transition-all text-[12px] lg:text-[13px] 2xl:text-[16px] ${errors.email
                ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                : "border-border-default focus:border-brand-purple"
                }`}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-brand-purple/70" />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[11px] 2xl:text-[12px]">{errors.email.message === "Email already exists"
                ? "An account with this email already exists. Please log in."
                : errors.email.message
              }</p>
            </div>
          )}
        </div>


        <div className="flex flex-col md:flex-row gap-3 2xl:gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-[12px] md:text-[13px] 2xl:text-[16px] font-semibold text-text-primary px-1">
              Password
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                placeholder="********"
                className={`pl-10 h-9 md:h-10 2xl:h-12 bg-white rounded-xl border transition-all text-[12px] lg:text-[13px] 2xl:text-[16px] ${errors.password
                  ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                  : "border-border-default focus:border-brand-purple"
                  }`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-brand-purple/70" />
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-state-error mt-1 px-1">
                <AlertCircle className="w-3 h-3" />
                <p className="text-[11px] 2xl:text-[12px]">{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <label className="text-[12px] md:text-[13px] 2xl:text-[16px] font-semibold text-text-primary px-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="********"
                className={`pl-10 h-9 md:h-10 2xl:h-12 bg-white rounded-xl border transition-all text-[12px] lg:text-[13px] 2xl:text-[16px] ${errors.confirmPassword
                  ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                  : "border-border-default focus:border-brand-purple"
                  }`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-brand-purple/70" />
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-1 text-state-error mt-1 px-1">
                <AlertCircle className="w-3 h-3" />
                <p className="text-[11px] 2xl:text-[12px]">{errors.confirmPassword.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 2xl:gap-3 pt-1 2xl:pt-2">
          <input
            type="checkbox"
            id="agree"
            {...register("agree")}
            className={`w-4 h-4 2xl:w-5 2xl:h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer ${errors.agree ? "border-state-error" : ""
              }`}
          />
          <label htmlFor="agree" className="text-[12px] 2xl:text-[14px] text-text-primary">
            I agree to the{" "}
            <Link
              to="/terms"
              className="font-bold text-state-error underline cursor-pointer"
            >
              Terms & Privacy Policy
            </Link>
          </label>
        </div>

        {errors.agree && (
          <p className="text-[11px] 2xl:text-[12px] text-state-error px-1">
            {errors.agree.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full h-9 md:h-10 2xl:h-14 text-[13px] lg:text-[14px] 2xl:text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-2 2xl:mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || isLocating || !isValid}
        >
          {isLocating
            ? "Signing Up...." // getting location
            : isSubmitting
              ? "Sign Up..."
              : "Sign Up"}
        </Button>

        {locationError && (
          <p className="text-center text-[11px] lg:text-[12px] 2xl:text-[13px] text-state-error font-medium">
            {locationError}
          </p>
        )}

        <p className="mt-1 md:mt-2 xl:mt-4 text-center text-[12px] lg:text-[13px] 2xl:text-[16px] text-text-secondary">
          Already Have An Account?{" "}
          <a
            href="/login"
            className="font-bold text-brand-purple hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
