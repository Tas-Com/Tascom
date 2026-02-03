import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '../hook/useLogin';
import { Button, Input } from '../../../shared/components/ui';
import { Mail, Lock, Loader2 } from 'lucide-react';

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
        // Handle success (e.g., redirect or show toast)
        console.log(`Welcome ${user.name}!`);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="bg-bg-secondary rounded-2xl shadow-xl border border-border-default overflow-hidden transition-all hover:shadow-2xl">
      <div className="p-8">
        <div className="text-center mb-10">
          <h1 className="font-semibold text-[48px] leading-[120%] text-center text-text-primary mb-2">Welcome Back!</h1>
          <p className="font-normal text-[18px] leading-[140%] text-center text-text-secondary">Connect, collaborate, and get things done</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-caption2 text-text-primary flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <div className="relative group">
              <Input
                {...register('email')}
                type="email"
                placeholder="placeholder@gmail.com"
                className={`pl-3 transition-all ${errors.email ? 'border-state-error' : 'focus:border-brand-purple'}`}
              />
            </div>
            {errors.email && (
              <p className="text-label2 text-state-error animate-in fade-in slide-in-from-top-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-caption2 text-text-primary flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <div className="relative group">
              <Input
                {...register('password')}
                type="password"
                placeholder="********"
                className={`transition-all ${errors.password ? 'border-state-error' : 'focus:border-brand-purple'}`}
              />
            </div>
            {errors.password && (
              <p className="text-label2 text-state-error animate-in fade-in slide-in-from-top-1">
                {errors.password.message}
              </p>
            )}
            <div className="text-right">
              <a href="#" className="text-caption2 text-brand-purple hover:underline">Forget Password ?</a>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-btn-primary bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
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

          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-border-default/50">
            <p className="text-caption1 text-text-secondary">Or continue with</p>
            <div className="flex gap-4">
               {/* Facebook Icon Placeholder - using Lucide or simple circles for now to match UI mockup */}
               <button type="button" className="p-2 border border-border-default rounded-full hover:bg-bg-primary transition-colors">
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
               </button>
               <button type="button" className="p-2 border border-border-default rounded-full hover:bg-bg-primary transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.693-2.414 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.111C3.15 21.28 7.24 24 12 24c3.127 0 5.952-1.036 8.04-2.822l-4-3.165z"/><path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.62-.213-2.385H12v4.567h6.452a5.54 5.54 0 0 1-2.412 3.556l4 3.165c2.333-2.152 3.45-5.32 3.45-8.903z"/><path fill="#FBBC05" d="M5.286 14.268a7.014 7.014 0 0 1-.377-2.268c0-.795.137-1.558.377-2.268l-4.027-3.115A11.958 11.958 0 0 0 0 12c0 1.892.44 3.684 1.223 5.308l4.063-3.04z"/></svg>
               </button>
            </div>
          </div>

          {loginMutation.isError && (
            <div className="bg-state-error/10 border border-state-error/20 p-3 rounded-lg flex items-center gap-3 animate-in shake">
              <p className="text-caption2 text-state-error">Invalid credentials. Please try again.</p>
            </div>
          )}
        </form>

        <p className="mt-8 text-center text-body-s1 text-text-secondary">
          Don't Have An Account? <a href="/register" className="text-body-s2 text-brand-purple hover:underline transition-all">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
