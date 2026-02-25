import { Outlet } from "@tanstack/react-router";
import communityTags from "../../../assets/auth/community_tags.png";
import heartLogo from "../../../assets/auth/tascom_heart_logo.png";
import textLogo from "../../../assets/auth/tascom_text_logo.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-bg-primary overflow-hidden">
      {/* Main Container */}
      <div className="w-full h-full bg-white shadow-2xl flex flex-col lg:flex-row">
        {/* Left Side: Branding */}
        <div className="hidden lg:flex w-full lg:w-[50%] bg-brand-purple flex-col items-center justify-center p-4 lg:p-6 xl:p-12 2xl:p-24 text-white relative">
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm lg:max-w-lg xl:max-w-2xl 2xl:max-w-[800px] text-center h-full max-h-[90vh]">

            <div className="flex-1 w-full flex items-center justify-center min-h-[250px] max-h-[55vh] lg:mb-4 2xl:mb-12 animate-in zoom-in duration-700">
              <img
                src={communityTags}
                alt="Community Tags"
                className="w-full h-full max-w-full object-contain scale-110 xl:scale-125"
              />
            </div>

            {/* Logo Section */}
            <div className="flex flex-col items-center justify-end shrink-0 gap-1 lg:gap-2 mb-2 lg:mb-4">
              <img
                src={heartLogo}
                alt="Tascom Heart"
                className="w-10 lg:w-16 2xl:w-28 h-auto object-contain"
              />
              <img
                src={textLogo}
                alt="Tascom"
                className="w-[100px] lg:w-[160px] 2xl:w-[240px] h-auto object-contain"
              />
            </div>

            {/* Slogan */}
            <div className="max-w-xs lg:max-w-md 2xl:max-w-lg shrink-0">
              <p className="font-normal text-[11px] lg:text-[13px] 2xl:text-[16px] leading-[120%] text-center opacity-90 px-4 md:px-10">
                Discover a community where tasks are shared, help is exchanged,
                and trust is built.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full lg:w-[50%] bg-white flex flex-col h-full overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 xl:p-16 2xl:p-20 min-h-max">
            <div className="w-full max-w-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
