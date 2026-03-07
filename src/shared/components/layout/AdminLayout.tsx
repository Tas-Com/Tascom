import { useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { AdminSidebar } from "./AdminSidebar";
import { Search, Bell, Menu, X } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";
import { cn } from "@/shared/utils";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  // Determine dynamic title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard' || path === '/admin' || path === '/admin/') {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>Hello Ahmad!</span>
            <span role="img" aria-label="wave">👋</span>
          </div>
          <span className="text-[14px] font-medium text-text-third mt-1 tracking-normal font-sans">
            Here's a quick overview of today's platform activity
          </span>
        </div>
      );
    }
    if (path.includes('/admin/tasks')) return 'Tasks Moderation';
    if (path.includes('/admin/users')) return 'Users Management';
    if (path.includes('/admin/reports')) return 'Reports';
    if (path.includes('/admin/roles')) return 'Roles Management';
    if (path.includes('/admin/settings')) return 'Settings';
    return 'Admin Panel';
  };

  return (
    <div 
      className="flex bg-bg-primary font-sans antialiased text-text-primary overflow-hidden"
      style={{ 
        zoom: '0.75', 
        height: '133.333333vh', // Compensation for 0.75 zoom (100 / 0.75)
        width: '133.333333vw'  // Compensation for 0.75 zoom (100 / 0.75)
      }}
    >
      {/* Sidebar - Strictly Fixed Height */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out 
        lg:translate-x-0 lg:static lg:block lg:shrink-0 h-full
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Global Overlays (Sidebar & Notification) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Global Sidebar Overlay (Mobile only) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Container - Scrollable internal area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Header - Fixed at top of main container */}
        <header 
          className="h-[110px] bg-white flex items-center justify-between px-[40px] shrink-0 z-30 shadow-[0px_14px_42px_0px_#0000000A]"
        >
          {/* Mobile Menu Toggle & Title */}
          <div className="flex items-center gap-6">
            <button 
              className="lg:hidden p-2 hover:bg-bg-primary rounded-lg text-text-primary transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-[36px] font-bold text-[#251455] font-[Poppins] tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Header Actions Section */}
          <div className="flex items-center gap-[40px]">
            {/* Custom Search Bar */}
            <div className="relative hidden md:flex items-center">
              <div className="absolute left-7 text-text-primary">
                <Search size={24} className="text-[#251455] opacity-70" />
              </div>
              <input 
                type="text" 
                placeholder="Search"
                className="w-[480px] h-[60px] pl-[72px] pr-8 rounded-full border border-[#0000001A] text-[18px] outline-none focus:border-brand-purple/30 transition-all font-[Poppins] shadow-sm placeholder:text-text-third"
              />
            </div>

            {/* Custom Notification Bell, Avatar, and Name Group */}
            <div className="flex items-center gap-8">
              <div className="relative">
                <div 
                  className={cn(
                    "relative cursor-pointer hover:bg-bg-primary/50 p-2 rounded-xl transition-all",
                    isNotificationOpen && "bg-bg-primary/50"
                  )}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="w-9 h-9 text-[#251455]" />
                  <span className="absolute top-0 right-0 w-[24px] h-[24px] bg-brand-purple rounded-full border-2 border-white flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
                    6
                  </span>
                </div>
                {isNotificationOpen && <NotificationPopover />}
              </div>

              <div className="flex items-center gap-5 border-l border-[#0000001A] pl-8">
                <div className="relative">
                    <img 
                    src="/Adam.jpg" 
                    alt="Admin" 
                    className="w-[64px] h-[64px] rounded-full object-cover border-2 border-white shadow-md" 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-status-active border-2 border-white rounded-full"></div>
                </div>
                <span className="font-bold text-[20px] text-[#251455] font-[Poppins] hidden sm:inline whitespace-nowrap">
                  Ahmad Khalifa
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Independently scrollable */}
        <main className="flex-1 overflow-y-auto p-[40px] bg-bg-primary/50">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
