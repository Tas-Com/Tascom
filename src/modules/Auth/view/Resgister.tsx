import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../hook/useRegister";
import { Button, Input } from "../../../shared/components/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { getLocation } from "../../../shared/utils/getLocation";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid Email"),
    phoneNumber: z.string().min(9, "Invalid Phone Number Format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    agree: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const registerMutation = useRegister();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLocationError(null);
    setIsLocating(true);

    try {
      const { latitude, longitude } = await getLocation();
      setIsLocating(false);

      registerMutation.mutate(
        {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          location: `${latitude},${longitude}`,
        },
        {
          onSuccess: (user) => {
            console.log(`Welcome ${user.name}!`);
            setShowSuccess(true);
            setTimeout(() => {
              navigate({ to: "/" });
            }, 2000);
          },
          onError: (err: any) => {
            const apiError = err.response?.data;
            if (apiError && apiError.errors) {
              apiError.errors.forEach((error: { field: string; message: string }) => {
                setError(error.field as keyof RegisterFormValues, {
                  type: "manual",
                  message: error.message,
                });
              });
            } else if (apiError && apiError.message) {
              setLocationError(apiError.message);
            }
          },
        },
      );
    } catch {
      setIsLocating(false);
      setLocationError(
        "Please enable location access to register. We need your location to connect you with nearby tasks.",
      );
    }
  };

  return (
    <div className="w-full flex flex-col justify-center min-h-256 py-10">
      <div className="text-center mb-8">
        <h1 className="text-[36px] font-bold text-brand-purple mb-1">
          Welcome to Tascom
        </h1>
        <p className="text-[14px] text-text-secondary">
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label
            className={`text-[16px] font-semibold px-1 ${
              errors.name ? "text-state-error" : "text-text-primary"
            }`}
          >
            Name
          </label>
          <div className="relative">
            <Input
              {...register("name")}
              placeholder="Full Name"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${
                errors.name
                  ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                  : "border-border-default focus:border-brand-purple"
              }`}
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
          </div>
          {errors.name && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.name.message}</p>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label
            className={`text-[16px] font-semibold px-1 ${
              errors.phoneNumber ? "text-state-error" : "text-text-primary"
            }`}
          >
            Phone Number
          </label>
          <div className="relative">
            <Input
              {...register("phoneNumber")}
              placeholder="059-000-0000"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${
                errors.phoneNumber
                  ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                  : "border-border-default focus:border-brand-purple"
              }`}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <img
                src="https://flagcdn.com/w20/ps.png"
                alt="PS"
                className="w-5 h-auto rounded-sm"
              />
            </div>
          </div>
          {errors.phoneNumber && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.phoneNumber.message}</p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            className={`text-[16px] font-semibold px-1 ${
              errors.email ? "text-state-error" : "text-text-primary"
            }`}
          >
            Email
          </label>
          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              placeholder="example@gmail.com"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${
                errors.email
                  ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                  : "border-border-default focus:border-brand-purple"
              }`}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* Location error */}
        {locationError && (
          <div className="flex items-center gap-2 text-state-error bg-state-error/10 border border-state-error/30 p-3 rounded-xl">
            <MapPin className="w-5 h-5 shrink-0" />
            <p className="text-[13px]">{locationError}</p>
          </div>
        )}

        {/* Passwords */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <label
              className={`text-[16px] font-semibold px-1 ${
                errors.password ? "text-state-error" : "text-text-primary"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                placeholder="********"
                className={`pl-10 h-12 bg-white rounded-xl border transition-all ${
                  errors.password
                    ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                    : "border-border-default focus:border-brand-purple"
                }`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-state-error mt-1 px-1">
                <AlertCircle className="w-3 h-3" />
                <p className="text-[12px]">{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <label
              className={`text-[16px] font-semibold px-1 ${
                errors.confirmPassword
                  ? "text-state-error"
                  : "text-text-primary"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="********"
                className={`pl-10 h-12 bg-white rounded-xl border transition-all ${
                  errors.confirmPassword
                    ? "border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]"
                    : "border-border-default focus:border-brand-purple"
                }`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-1 text-state-error mt-1 px-1">
                <AlertCircle className="w-3 h-3" />
                <p className="text-[12px]">{errors.confirmPassword.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="agree"
            {...register("agree")}
            className={`w-5 h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer ${
              errors.agree ? "border-state-error" : ""
            }`}
          />
          <label htmlFor="agree" className="text-[14px] text-text-primary">
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
          <p className="text-[12px] text-state-error px-1">
            {errors.agree.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full h-14 text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-4"
          disabled={registerMutation.isPending || isLocating}
        >
          {isLocating
            ? "Getting location..."
            : registerMutation.isPending
              ? "Signing Up..."
              : "Sign Up"}
        </Button>

        <p className="mt-8 text-center text-[16px] text-text-secondary">
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
