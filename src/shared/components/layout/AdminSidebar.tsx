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

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className="w-[284px] h-screen bg-white flex flex-col relative"
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

      <div className="p-6 flex items-center gap-2 mb-4">
        <img src="/Grouph 2.png" alt="logo" className="w-[32px] h-[32px]" />
        <span className="text-[24px] text-brand-purple font-bold tracking-tight">Tascom</span>
      </div>

      <nav className="flex-1 px-[24px] space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href || (item.href === '/admin/dashboard' && location.pathname === '/admin');
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[16px]",
                isActive 
                  ? "bg-bg-card-hover text-brand-purple border border-brand-purple/10" 
                  : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
              )}
            >
              <item.icon size={20} className={isActive ? "text-brand-purple" : "text-text-secondary"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-[24px] pb-[32px] pt-4 space-y-2">
        {BOTTOM_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[16px]",
                isActive 
                  ? "bg-bg-card-hover text-brand-purple border border-brand-purple/10" 
                  : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
              )}
            >
              <item.icon size={20} className={isActive ? "text-brand-purple" : "text-text-secondary"} />
              {item.label}
            </Link>
          );
        })}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[16px] text-[#FF4C4C] hover:bg-red-50 mt-2">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
