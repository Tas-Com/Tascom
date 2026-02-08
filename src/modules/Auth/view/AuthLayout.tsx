import { Outlet } from '@tanstack/react-router';
import communityTags from '../../../assets/auth/community_tags.png';
import heartLogo from '../../../assets/auth/tascom_heart_logo.png';
import textLogo from '../../../assets/auth/tascom_text_logo.png';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 lg:p-10">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Branding */}
        <div className="w-full lg:w-[720px] bg-brand-purple flex flex-col items-center justify-center p-12 md:p-20 text-white relative">
          <div className="relative z-10 flex flex-col items-center w-full max-w-sm text-center">
            {/* Community Tags Illustration */}
            <div className="mb-20 w-full animate-in zoom-in duration-700">
              <img 
                src={communityTags} 
                alt="Community Tags" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Logo Section */}
            <div className="space-y-6 mb-4">
              <img 
                src={heartLogo} 
                alt="Tascom Heart" 
                className="w-32 h-auto mx-auto"
              />
              <img 
                src={textLogo} 
                alt="Tascom" 
                className="w-64 h-auto mx-auto"
              />
            </div>

            {/* Slogan */}
            <p className="font-normal text-[18px] leading-[140%] text-center opacity-90 px-6">
              Discover a community where tasks are shared, help is exchanged, and trust is built.
            </p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full lg:w-[720px] bg-white flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-20">
            <div className="w-full max-w-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
