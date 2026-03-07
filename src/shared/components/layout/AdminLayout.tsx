import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "./AdminSidebar";
import { Search, Bell, Menu, X } from "lucide-react";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary font-sans antialiased text-text-primary">
      {/* Sidebar - Desktop and Mobile Drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header 
          className="h-[94px] bg-white flex items-center justify-between px-4 sm:px-[32px] sticky top-0 z-30"
          style={{ 
            boxShadow: '0px 14px 42px 0px #0000000A' 
          }}
        >
          {/* Mobile Menu Toggle & Greeting */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-bg-primary rounded-lg text-text-primary transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden xs:flex flex-col gap-0.5 sm:gap-1">
              <h2 className="text-[18px] sm:text-[24px] font-semibold text-text-primary leading-tight font-[Poppins]">Hello Ahmad! 👋</h2>
              <p className="text-[12px] sm:text-[14px] text-text-secondary font-[Poppins] hidden sm:block">Today's platform activity overview</p>
            </div>
          </div>

          {/* Header Actions Section */}
          <div className="flex items-center gap-3 sm:gap-[24px]">
            {/* Custom Search Bar - Responsive width */}
            <div className="relative hidden md:flex items-center">
              <div className="absolute left-6 text-text-primary">
                <Search size={20} className="text-[#251455]" />
              </div>
              <input 
                type="text" 
                placeholder="Search"
                className="w-[200px] lg:w-[420px] h-[48px] lg:h-[52px] pl-[56px] pr-6 rounded-full border border-[#0000001A] text-[14px] lg:text-[16px] outline-none focus:border-brand-purple/30 transition-all font-[Poppins]"
              />
            </div>

            {/* Custom Notification Bell */}
            <div className="relative cursor-pointer p-1">
              <Bell size={28} lg:size={32} className="text-[#251455]" />
              <span className="absolute -top-1 -right-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] bg-brand-purple rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] lg:text-[12px] font-bold">
                6
              </span>
            </div>

            {/* Custom User Info */}
            <div className="flex items-center gap-2 sm:gap-4 lg:ml-2">
              <img 
                src="/Adam.jpg" 
                alt="Admin" 
                className="w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] rounded-full object-cover border-2 border-[#E5E7EB]" 
              />
              <span className="font-bold text-[14px] sm:text-[16px] lg:text-[18px] text-[#251455] font-[Poppins] hidden sm:inline">
                Ahmad Khalifa
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-[32px] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
