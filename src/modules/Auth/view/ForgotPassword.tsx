import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from '@tanstack/react-router';
import { Mail, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../shared/components/ui';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid Email'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (data: ForgotPasswordValues) => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Reset link sent to:', data.email);
            setIsSubmitting(false);
            setIsSent(true);
        }, 2000);
    };

    return (
        <div className="w-full py-4">
            <div className="text-center mb-10">
                <h1 className="text-[48px] font-bold text-brand-purple mb-1">Forgot Password?</h1>
                <p className="text-[18px] text-text-secondary">Enter your email to receive reset instructions</p>
            </div>

            {isSent ? (
                <div className="bg-state-success/10 border border-state-success/30 p-6 rounded-2xl text-center animate-in zoom-in">
                    <p className="text-brand-purple font-semibold text-[18px] mb-2">Instructions Sent!</p>
                    <p className="text-text-secondary text-[14px]">Please check your email for the reset link.</p>
                    <Link to="/login" className="inline-block mt-6 text-brand-purple font-bold hover:underline">
                        Go back to login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-[16px] font-semibold text-text-primary px-1">Email</label>
                        <div className="relative">
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="placeholder@gmail.com"
                                className={`pl-10 h-14 bg-white rounded-xl border transition-all ${errors.email ? 'border-state-error shadow-[0_0_0_1px_rgba(218,57,44,0.1)]' : 'border-border-default focus:border-brand-purple'}`}
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

                    <Button
                        type="submit"
                        className="w-full h-14 text-[18px] font-bold bg-brand-purple hover:bg-brand-purple/90 text-white rounded-[100px] shadow-lg shadow-brand-purple/20 transition-all active:scale-[0.98] mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            'Send Reset Link'
                        )}
                    </Button>

                    <p className="text-center text-[16px] text-text-secondary">
                        Back to <Link to="/login" className="font-bold text-brand-purple hover:underline">Login</Link>
                    </p>
                </form>
            )}
        </div>
    );
}