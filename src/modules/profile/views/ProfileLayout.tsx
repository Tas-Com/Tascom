import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useLogout } from "@/modules/Auth/hook/useLogout";
import { useTranslation } from "react-i18next";
import {
  User, Bookmark, LayoutDashboard, Coins, ClipboardList,
  Globe, Bell, Lock, Flag, Trash2, LogOut
} from "lucide-react";

export function ProfileLayout() {
  const { handleLogout } = useLogout();
  const { t } = useTranslation();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex min-h-screen bg-bg-primary">

      <aside className="w-60 bg-bg-secondary border-r border-border-default p-5 space-y-6 flex flex-col">

      
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">{t("sidebar.profile")}</p>
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
                <User className="w-4 h-4" /> {t("sidebar.myProfile")}
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
                <Bookmark className="w-4 h-4" /> {t("sidebar.savedTasks")}
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">{t("sidebar.dashboard")}</p>
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
                <LayoutDashboard className="w-4 h-4" /> {t("sidebar.userDashboard")}
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
                <Coins className="w-4 h-4" /> {t("sidebar.pointsBalance")}
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
                <ClipboardList className="w-4 h-4" /> {t("sidebar.requests")}
              </Link>
            </li>
          </ul>
        </div>

    
        <div>
          <p className="text-xs text-text-secondary mb-2 px-2">{t("sidebar.settings")}</p>
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
                <Globe className="w-4 h-4" /> {t("sidebar.language")}
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
                <Bell className="w-4 h-4" /> {t("sidebar.notifications")}
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
                <Lock className="w-4 h-4" /> {t("sidebar.password")}
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
                <Flag className="w-4 h-4" /> {t("sidebar.reports")}
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
                <Trash2 className="w-4 h-4" /> {t("sidebar.deleteAccount")}
              </Link>
            </li>
          </ul>
        </div>

     
        <div className="mt-auto pt-4 border-t border-border-default">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary transition w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> {t("sidebar.logout")}
          </button>
        </div>

      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
