import { Link, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  FileText,
  X
} from "lucide-react";
import { cn } from "@/shared/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FileText, label: "Tasks Moderation", href: "/admin/tasks" },
  { icon: Users, label: "Users Management", href: "/admin/users" },
  { icon: ShieldCheck, label: "Reports", href: "/admin/reports" },
];

const BOTTOM_ITEMS = [
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

import { useState } from "react";
import { useLogout } from "@/modules/Auth/hook/useLogout";
import { LogoutDialog } from "./LogoutDialog";

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const location = useLocation();
  const { handleLogout } = useLogout();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  return (
    <>
      <aside 
        className="w-[284px] h-full bg-white flex flex-col relative shrink-0"
        style={{ 
          borderRight: '0.5px solid #0000001A',
          boxShadow: '0px 14px 42px 0px #0000000A'
        }}
      >
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden absolute top-6 right-6 p-2 hover:bg-bg-primary rounded-lg text-text-secondary transition-colors z-10"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div className="p-8 flex items-center gap-3 mb-4">
          <img src="/Grouph 2.png" alt="logo" className="w-[40px] h-[40px]" />
          <span className="text-[28px] text-brand-purple font-bold tracking-tight font-[Poppins]">Tascom</span>
        </div>

        {/* Navigation section */}
        <nav className="flex-1 px-[24px] space-y-3">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/'));
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all font-semibold text-[16px] group",
                  isActive 
                    ? "bg-brand-purple/5 text-brand-purple border border-brand-purple/10 shadow-sm" 
                    : "text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary"
                )}
              >
                <item.icon size={22} className={cn(
                  "transition-colors",
                  isActive ? "text-brand-purple" : "text-text-secondary group-hover:text-text-primary"
                )} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-[24px] pb-[40px] pt-6 space-y-3 border-t border-[#0000000A]">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all font-semibold text-[16px] group",
                  isActive 
                    ? "bg-brand-purple/5 text-brand-purple border border-brand-purple/10 shadow-sm" 
                    : "text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary"
                )}
              >
                <item.icon size={22} className={cn(
                  "transition-colors",
                  isActive ? "text-brand-purple" : "text-text-secondary group-hover:text-text-primary"
                )} />
                {item.label}
              </Link>
            );
          })}
          <button 
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all font-bold text-[16px] text-[#FF4C4C] hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all mt-2 group"
          >
            <LogOut size={22} className="group-hover:rotate-6 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      <LogoutDialog 
        isOpen={isLogoutDialogOpen} 
        onClose={() => setIsLogoutDialogOpen(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
}
