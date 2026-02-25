import { useState } from "react";
import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useLogout } from "@/modules/Auth/hook/useLogout";
import { useTranslation } from "react-i18next";
import {
  User,
  Bookmark,
  LayoutDashboard,
  Coins,
  ClipboardList,
  Globe,
  Bell,
  Lock,
  Flag,
  Trash2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  danger?: boolean;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    titleKey: "sidebar.profile",
    items: [
      { to: "/profile", icon: User, labelKey: "sidebar.myProfile" },
      { to: "/profile/saved", icon: Bookmark, labelKey: "sidebar.savedTasks" },
    ],
  },
  {
    titleKey: "sidebar.dashboard",
    items: [
      {
        to: "/dashboard",
        icon: LayoutDashboard,
        labelKey: "sidebar.userDashboard",
      },
      { to: "/profile/points", icon: Coins, labelKey: "sidebar.pointsBalance" },
      {
        to: "/profile/requests",
        icon: ClipboardList,
        labelKey: "sidebar.requests",
      },
    ],
  },
  {
    titleKey: "sidebar.settings",
    items: [
      {
        to: "/profile/settings/language",
        icon: Globe,
        labelKey: "sidebar.language",
      },
      {
        to: "/profile/settings/notification",
        icon: Bell,
        labelKey: "sidebar.notifications",
      },
      {
        to: "/profile/settings/password",
        icon: Lock,
        labelKey: "sidebar.password",
      },
      {
        to: "/profile/settings/reports",
        icon: Flag,
        labelKey: "sidebar.reports",
      },
      {
        to: "/profile/settings/delete",
        icon: Trash2,
        labelKey: "sidebar.deleteAccount",
        danger: true,
      },
    ],
  },
];

function NavContent({
  isActive,
  onNavigate,
}: {
  isActive: (path: string) => boolean;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      {navSections.map((section) => (
        <div key={section.titleKey}>
          <p className="text-xs text-text-secondary mb-2 px-2">
            {t(section.titleKey)}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`flex items-center gap-2 p-2 h-11.5 rounded-2xl text-sm font-medium transition w-full xl:max-w-83 border
                    ${isActive(item.to)
                      ? item.danger
                        ? "bg-red-50 text-state-error border-state-error/20"
                        : "bg-purple-50 text-brand-purple border-brand-purple"
                      : item.danger
                        ? "text-state-error hover:bg-red-50 border-transparent"
                        : "text-text-primary hover:bg-bg-primary border-transparent"
                    }`}
                >
                  <item.icon className="w-5 h-5 mx-1" />
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function ProfileLayout() {
  const { handleLogout } = useLogout();
  const { t } = useTranslation();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => currentPath === path;

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row w-full flex-1 bg-bg-primary">
      <header className="md:hidden flex items-center px-4 shrink-0 h-16 bg-bg-secondary border-b border-border-default z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 text-text-primary hover:bg-bg-primary rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-3 text-lg font-semibold text-text-primary">
          {t("sidebar.profileMenu")}
        </span>
      </header>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-45"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className="hidden md:flex flex-col md:w-64 xl:w-99 shrink-0 h-100% bg-bg-secondary p-4 xl:px-8 xl:py-10 gap-6 xl:gap-4">
        <NavContent isActive={isActive} />
        <div className="pt-4 border-t border-border-default">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 h-11.5 rounded-2xl text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary transition w-full xl:max-w-83 border border-transparent cursor-pointer"
          >
            <LogOut className="w-5 h-5 mx-1" />
            {t("sidebar.logout")}
          </button>
        </div>
      </aside>

      <aside
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-bg-secondary border-r border-border-default p-4 flex flex-col gap-6 overflow-y-auto z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-text-primary px-2">
            {t("sidebar.menu")}
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-text-primary hover:bg-bg-primary rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <NavContent isActive={isActive} onNavigate={handleNavClick} />

        <div className="mt-auto pt-4 border-t border-border-default">
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 p-2 h-11.5 rounded-2xl text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary transition w-full border border-transparent cursor-pointer"
          >
            <LogOut className="w-5 h-5 mx-1" />
            {t("sidebar.logout")}
          </button>
        </div>
      </aside>

      <main className="flex-1 w-full p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
