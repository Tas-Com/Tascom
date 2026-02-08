import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../shared/components/ui';
import { useState } from 'react';

const createNewPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Your passwords don't match",
  path: ["confirmPassword"],
});

type CreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>;

export default function CreateNewPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordValues>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: CreateNewPasswordValues) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log('Updating password...', data.password);
    setTimeout(() => {
      console.log('Password updated successfully');
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 2000);
  };

  return (
    <div className="w-full py-4">
      <div className="text-center mb-10">
        <h1 className="text-[48px] font-bold text-brand-purple mb-1">Create New Password</h1>
        <p className="text-[18px] text-text-secondary">Create a new password to secure your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* New Password */}
        <div className="space-y-2">
          <label className="text-[16px] font-semibold text-text-primary px-1">New Password</label>
          <div className="relative">
            <Input
              {...register('password')}
              type="password"
              placeholder="********"
              className={`pl-10 h-14 bg-white rounded-xl border transition-all ${errors.password ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.password.message}</p>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label className="text-[16px] font-semibold text-text-primary px-1">Confirm New Password</label>
          <div className="relative">
            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="********"
              className={`pl-10 h-14 bg-white rounded-xl border transition-all ${errors.confirmPassword ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-1 text-state-error mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              <p className="text-[12px]">{errors.confirmPassword.message}</p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-4"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Resetting...
            </>
          ) : isSuccess ? (
            'Password Created!'
          ) : (
            'Create New Password'
          )}
        </Button>

        {isSuccess && (
          <p className="text-center text-[14px] text-state-success animate-in slide-in-from-top-2">
            Success! Redirecting to login...
          </p>
        )}
      </form>
    </div>
  );
}
