import { Outlet } from '@tanstack/react-router';
import communityTags from '../../../assets/auth/community_tags.png';
import heartLogo from '../../../assets/auth/tascom_heart_logo.png';
import textLogo from '../../../assets/auth/tascom_text_logo.png';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-brand-purple flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-md text-center">
          {/* Community Tags Illustration */}
          <div className="mb-12 animate-in zoom-in duration-700">
            <img 
              src={communityTags} 
              alt="Community Tags" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* Logo Section */}
          <div className="space-y-4 mb-8">
            <img 
              src={heartLogo} 
              alt="Tascom Heart" 
              className="w-24 h-auto mx-auto animate-pulse"
            />
            <img 
              src={textLogo} 
              alt="Tascom" 
              className="w-48 h-auto mx-auto"
            />
          </div>

          {/* Slogan */}
          <p className="font-normal text-base leading-[120%] text-center opacity-90">
            "Discover a community where tasks are shared, help is exchanged, and trust is built."
          </p>
        </div>
      </div>

      {/* Right Side: Form Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-bg-primary relative overflow-hidden">
         {/* Decorative blobs for the right side too, but subtle */}
         <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-purple/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
         <div className="absolute -bottom-8 right-0 w-72 h-72 bg-status-completed/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

         <div className="w-full max-w-lg z-10">
            <Outlet />
         </div>
      </div>
    </div>
  );
}
