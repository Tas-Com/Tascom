import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '../hook/useLogin';
import { Button, Input } from '../../../shared/components/ui';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (user) => {
        console.log(`Welcome ${user.name}!`);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="w-full flex flex-col justify-center min-h-[1020px] py-10">
      <div className="text-center mb-10">
        <h1 className="text-[40px] font-bold text-brand-purple mb-1">Welcome Back!</h1>
        <p className="text-[14px] text-text-secondary">Connect, collaborate, and get things done</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-[16px] font-semibold text-text-primary px-1">Email</label>
          <div className="relative">
            <Input
              {...register('email')}
              type="email"
              placeholder="placeholder@gmail.com"
              className={`pl-10 h-12 bg-white rounded-xl border border-border-default transition-all ${errors.email ? 'border-state-error' : 'focus:border-brand-purple'}`}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
          </div>
          {errors.email && (
            <p className="text-[12px] text-state-error mt-1 px-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[16px] font-semibold text-text-primary px-1">Password</label>
          <div className="relative">
            <Input
              {...register('password')}
              type="password"
              placeholder="********"
              className={`pl-10 h-12 bg-white rounded-xl border border-border-default transition-all ${errors.password ? 'border-state-error' : 'focus:border-brand-purple'}`}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple/70" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
          <div className="flex justify-between items-start px-1 min-h-[20px]">
            {errors.password ? (
              <p className="text-[12px] text-state-error">{errors.password.message}</p>
            ) : <div />}
            <Link to="/forgot-password" title="Forgot Password?" className="text-[14px] text-brand-purple hover:underline font-medium">Forget Password ?</Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-4"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Signing in...
            </>
          ) : (
            'Login'
          )}
        </Button>

        {loginMutation.isError && (
          <div className="bg-state-error/10 border border-state-error/20 p-3 rounded-lg flex items-center gap-3 animate-in shake">
            <p className="text-[14px] text-state-error">Invalid credentials. Please try again.</p>
          </div>
        )}

        <div className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-[14px] text-text-secondary">Or continue with</p>
          <div className="flex gap-6">
              <button type="button" className="p-1 hover:opacity-80 transition-opacity">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>
              </button>
              <button type="button" className="p-1 hover:opacity-80 transition-opacity">
                  <svg className="w-10 h-10" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.693-2.414 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.111C3.15 21.28 7.24 24 12 24c3.127 0 5.952-1.036 8.04-2.822l-4-3.165z"/><path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.62-.213-2.385H12v4.567h6.452a5.54 5.54 0 0 1-2.412 3.556l4 3.165c2.333-2.152 3.45-5.32 3.45-8.903z"/><path fill="#FBBC05" d="M5.286 14.268a7.014 7.014 0 0 1-.377-2.268c0-.795.137-1.558.377-2.268l-4.027-3.115A11.958 11.958 0 0 0 0 12c0 1.892.44 3.684 1.223 5.308l4.063-3.04z"/></svg>
              </button>
          </div>
        </div>
      </form>

      <p className="mt-12 text-center text-[16px] text-text-secondary">
        Don't Have An Account? <a href="/register" className="font-bold text-brand-purple hover:underline">Sign Up</a>
      </p>
    </div>
  );
}
