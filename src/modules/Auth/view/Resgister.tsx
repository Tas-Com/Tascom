import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegister } from '../hook/useRegister';
import { Button, Input } from '../../../shared/components/ui';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(5, 'Please enter a valid location'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  agree: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const registerMutation = useRegister();

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
    registerMutation.mutate(requestData, {
      onSuccess: (user) => {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-purple/10 rounded-2xl mb-4 transition-transform hover:scale-110">
            <UserPlus className="w-8 h-8 text-brand-purple" />
          </div>
          <h1 className="text-h4 text-text-primary mb-2">Welcome to Tascom</h1>
          <p className="text-body-s1 text-text-secondary">Connect, collaborate, and get things done</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-caption2 text-text-primary">Name</label>
            <div className="relative group">
              <Input
                {...register('name')}
                placeholder="Placeholder"
                className={`pl-10 transition-all ${errors.name ? 'border-state-error' : 'focus:border-brand-purple'}`}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
            </div>
            {errors.name && (
              <p className="text-label2 text-state-error">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-caption2 text-text-primary">Phone Number</label>
            <div className="relative group">
              <Input
                {...register('phoneNumber')}
                placeholder="059-000-0000"
                className={`pl-10 transition-all ${errors.phoneNumber ? 'border-state-error' : 'focus:border-brand-purple'}`}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
              {/* Simple Palestine Flag Icon/Emoji for mockup accuracy */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2">🇵🇸</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-caption2 text-text-primary">Email</label>
            <div className="relative group">
              <Input
                {...register('email')}
                type="email"
                placeholder="Placeholder@gmail.com"
                className={`pl-10 transition-all ${errors.email ? 'border-state-error' : 'focus:border-brand-purple'}`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-caption2 text-text-primary">Password</label>
              <div className="relative group">
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="********"
                  className={`pl-10 transition-all ${errors.password ? 'border-state-error' : 'focus:border-brand-purple'}`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-caption2 text-text-primary">Confirm Password</label>
              <div className="relative group">
                <Input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="********"
                  className={`pl-10 transition-all ${errors.confirmPassword ? 'border-state-error' : 'focus:border-brand-purple'}`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="agree"
              {...register('agree')}
              className="w-4 h-4 rounded border-border-default text-brand-purple focus:ring-brand-purple" 
            />
            <label htmlFor="agree" className="text-caption1 text-text-secondary">
              I agree to the <a href="#" className="font-semibold underline">Terms & Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-btn-primary bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-border-default/50">
            <p className="text-caption1 text-text-secondary">Or continue with</p>
            <div className="flex gap-4">
                <button type="button" className="p-2 border border-border-default rounded-full hover:bg-bg-primary transition-colors">
                    <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button type="button" className="p-2 border border-border-default rounded-full hover:bg-bg-primary transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.693-2.414 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.111C3.15 21.28 7.24 24 12 24c3.127 0 5.952-1.036 8.04-2.822l-4-3.165z"/><path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.62-.213-2.385H12v4.567h6.452a5.54 5.54 0 0 1-2.412 3.556l4 3.165c2.333-2.152 3.45-5.32 3.45-8.903z"/><path fill="#FBBC05" d="M5.286 14.268a7.014 7.014 0 0 1-.377-2.268c0-.795.137-1.558.377-2.268l-4.027-3.115A11.958 11.958 0 0 0 0 12c0 1.892.44 3.684 1.223 5.308l4.063-3.04z"/></svg>
                </button>
            </div>
          </div>
        </form>

        <p className="mt-8 text-center text-body-s1 text-text-secondary">
          Already Have An Account? <a href="/login" className="text-body-s2 text-brand-purple hover:underline transition-all">Login</a>
        </p>
      </div>
    </div>
  );
}
