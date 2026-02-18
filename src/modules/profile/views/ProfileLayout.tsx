import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useLogout } from "@/modules/Auth/hook/useLogout";
import {
  User, Bookmark, LayoutDashboard, Coins, ClipboardList,
  Globe, Bell, Lock, Flag, Trash2, LogOut
} from "lucide-react";

export function ProfileLayout() {
  const { handleLogout } = useLogout();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex min-h-screen bg-bg-primary">

      <aside className="w-60 bg-bg-secondary border-r border-border-default p-5 space-y-6 flex flex-col">

        {/* Profile */}
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">Profile</p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/saved")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Bookmark className="w-4 h-4" /> Saved Tasks
              </Link>
            </li>
          </ul>
        </div>

        {/* Dashboard */}
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">Dashboard</p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/dashboard")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" /> User Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/points")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Coins className="w-4 h-4" /> Points Balance
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/requests")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <ClipboardList className="w-4 h-4" /> Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Setting */}
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">Setting</p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/profile/settings/language"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/settings/language")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Globe className="w-4 h-4" /> Language
              </Link>
            </li>
            <li>
              <Link
                to="/profile/settings/notification"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/settings/notification")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Bell className="w-4 h-4" /> Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/profile/settings/password"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/settings/password")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Lock className="w-4 h-4" /> Password
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/settings/reports")
                    ? "bg-purple-50 text-brand-purple"
                    : "text-text-primary hover:bg-bg-primary"
                  }`}
              >
                <Flag className="w-4 h-4" /> Reports
              </Link>
            </li>
            <li>
              <Link
                to="/profile/settings/delete"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition
                  ${isActive("/profile/settings/delete")
                    ? "bg-red-50 text-state-error border border-state-error/20"
                    : "text-state-error hover:bg-red-50"
                  }`}
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-border-default">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary transition w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
