import { useNavigate } from '@tanstack/react-router';
import heartLogo from '../../../assets/auth/tascom_heart_logo.png';
import { ChevronLeft } from 'lucide-react';

export default function TermsPrivacyPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
            <div className="w-full max-w-[1438px] min-h-[814px] bg-white rounded-[40px] shadow-sm overflow-hidden flex flex-col p-12">
                {/* Header */}
                <div className="flex items-center gap-2 mb-10">
                    <img src={heartLogo} alt="Tascom" className="w-10 h-auto" />
                    <span className="text-[24px] font-bold text-brand-purple">Tascom</span>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate({ to: '/register' })}
                    className="flex items-center gap-1 text-text-primary hover:text-brand-purple transition-colors mb-8 font-semibold"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pr-4">
                    <h1 className="text-[24px] font-normal leading-[25px] tracking-[0.02em] text-text-primary px-1 mb-8">
                        Terms & Privacy Policy
                    </h1>

                    <section className="mb-8">
                        <h2 className="text-[20px] font-semibold leading-[120%] text-brand-purple mb-2">
                            Terms of Use
                        </h2>
                        <div className="text-[18px] font-normal leading-[25px] tracking-[0.02em] text-text-primary space-y-1">
                            <p>By accessing and using this website, you agree to comply with these terms and conditions.</p>
                            <p>Users must be at least 18 years old or have obtained parental consent to use the platform.</p>
                            <p>All information provided by users must be accurate, truthful, and current.</p>
                            <p>Users are responsible for maintaining the confidentiality of their account credentials and all activities performed under their accounts.</p>
                            <p>All events submitted must comply with applicable laws and the platform's content guidelines. Events containing inappropriate, illegal, or misleading information will be removed.</p>
                            <p>The platform reserves the right to suspend or remove any user or content that violates these terms.</p>
                            <p>The website and its services are provided "as is" without warranties. The platform is not liable for any damages resulting from the use of the site or its content.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[20px] font-semibold leading-[120%] text-brand-purple mb-2">
                            Privacy Policy
                        </h2>
                        <div className="text-[18px] font-normal leading-[25px] tracking-[0.02em] text-text-primary space-y-1">
                            <p>We collect personal information such as your name, email address, event details, and usage data necessary to operate and improve our services.</p>
                            <p>Your personal data will never be sold or rented to third parties. It may only be shared with trusted service providers supporting platform operations.</p>
                            <p>We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure.</p>
                            <p>You have the right to access, correct, or request deletion of your personal data at any time.</p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="footer-agree"
                        className="w-5 h-5 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer"
                    />
                    <label htmlFor="footer-agree" className="text-[14px] font-semibold text-text-primary">
                        I agree to the Terms & Privacy Policy
                    </label>
                </div>
            </div>
        </div>
    );
}