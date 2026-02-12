import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegister } from '../hook/useRegister';
import { Button, Input } from '../../../shared/components/ui';
import { Link, useNavigate } from '@tanstack/react-router';
import { User, Mail, Lock, Phone, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { useState } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid Email'),
  phoneNumber: z.string().min(9, 'Invalid Phone Number Format'),
  location: z.string().min(2, 'Location is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  agree: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Your passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const registerMutation = useRegister();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      location: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, agree, ...requestData } = data;
    registerMutation.mutate(requestData as any, {
      onSuccess: (user) => {
        console.log(`Welcome ${user.name}!`);
        setShowSuccess(true);
        setTimeout(() => {
          navigate({ to: '/' });
        }, 3000);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="w-full flex flex-col justify-center min-h-[1154px] py-10">
      <div className="text-center mb-8">
        <h1 className="text-[36px] font-bold text-brand-purple mb-1">Welcome to Tascom</h1>
        <p className="text-[14px] text-text-secondary">Connect, collaborate, and get things done</p>
      </div>

      {showSuccess && (
        <div className="bg-state-success/10 border border-state-success/30 p-4 rounded-xl flex items-center gap-3 mb-6 animate-in slide-in-from-top-5">
          <CheckCircle2 className="w-6 h-6 text-state-success flex-shrink-0" />
          <div>
            <p className="text-caption1 text-state-success font-semibold">Registration Successful!</p>
            <p className="text-caption2 text-text-secondary">Redirecting to home page...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[16px] font-semibold text-text-primary px-1">Name</label>
          <div className="relative">
            <Input
              {...register('name')}
              placeholder="Placeholder"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.name ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
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
          <label className="text-[16px] font-semibold text-text-primary px-1">Phone Number</label>
          <div className="relative">
            <Input
              {...register('phoneNumber')}
              placeholder="059-000-0000"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.phoneNumber ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <img src="https://flagcdn.com/w20/ps.png" alt="PS" className="w-5 h-auto rounded-sm" />
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
          <label className="text-[16px] font-semibold text-text-primary px-1">Email</label>
          <div className="relative">
            <Input
              {...register('email')}
              type="email"
              placeholder="placeholder@gmail.com"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.email ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
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

        {/* Location */}
        <div className="space-y-1">
          <label className="text-[16px] font-semibold text-text-primary px-1">Location</label>
          <div className="relative">
            <Input
              {...register('location')}
              placeholder="e.g. Gaza, Ramallah"
              className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.location ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
          </div>
          {errors.location && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.location.message}</p>
            </div>
          )}
        </div>

        {/* Passwords */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-[16px] font-semibold text-text-primary px-1">Password</label>
            <div className="relative">
              <Input
                {...register('password')}
                type="password"
                placeholder="********"
                className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.password ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-state-error mt-1 px-1">
                <AlertCircle className="w-3 h-3" />
                <p className="text-[12px]">{errors.password.message}</p>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-[16px] font-semibold text-text-primary px-1">Confirm Password</label>
            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="********"
                className={`pl-10 h-12 bg-white rounded-xl border transition-all ${errors.confirmPassword ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
              </button>
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
            {...register('agree')}
            className={`w-5 h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer ${errors.agree ? 'border-state-error' : ''}`}
          />
          <label htmlFor="agree" className="text-[14px] text-text-primary">
            I agree to the <Link to="/terms" className="font-bold text-state-error underline cursor-pointer">Terms & Privacy Policy</Link>
          </label>
        </div>
        {errors.agree && (
          <p className="text-[12px] text-state-error px-1">{errors.agree.message}</p>
        )}

        <Button
          type="submit"
          className="w-full h-14 text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-4"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? 'Sign Up...' : 'Sign Up'}
        </Button>

        <div className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-[14px] text-text-secondary">Or continue with</p>
          <div className="flex gap-6">
            <button type="button" className="p-1 hover:opacity-80 transition-opacity">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" /></svg>
            </button>
            <button type="button" className="p-1 hover:opacity-80 transition-opacity">
              <svg className="w-10 h-10" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" /><path fill="#34A853" d="M16.04 18.013c-1.09.693-2.414 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.111C3.15 21.28 7.24 24 12 24c3.127 0 5.952-1.036 8.04-2.822l-4-3.165z" /><path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.62-.213-2.385H12v4.567h6.452a5.54 5.54 0 0 1-2.412 3.556l4 3.165c2.333-2.152 3.45-5.32 3.45-8.903z" /><path fill="#FBBC05" d="M5.286 14.268a7.014 7.014 0 0 1-.377-2.268c0-.795.137-1.558.377-2.268l-4.027-3.115A11.958 11.958 0 0 0 0 12c0 1.892.44 3.684 1.223 5.308l4.063-3.04z" /></svg>
            </button>
          </div>
        </div>
      </form>

      <p className="mt-8 text-center text-[16px] text-text-secondary">
        Already Have An Account? <a href="/login" className="font-bold text-brand-purple hover:underline">Login</a>
      </p>
    </div>
  );
}