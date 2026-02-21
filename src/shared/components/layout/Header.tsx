import { Bell, MessageSquare, Home } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Link, useLocation } from "@tanstack/react-router";

type HeaderProps = {
  userName: string;
  userAvatar?: string;
  logoSrc?: string;
};

export function Header({ userName, userAvatar }: HeaderProps) {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");
  const isHomePage = location.pathname === "/";
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white flex items-center justify-between px-9 z-100">
      <div className="flex items-center gap-2 ml-7">
        <img src="/Grouph 2.png" alt="logo" className="w-64.78px h-44px" />
        <img src="/Tascom.png" alt="Tascom" className="h-44px w-144px" />
      </div>

      <div className="flex items-center gap-4">
        <SearchInput />
        <Link to="/">
          <Home
            size={25}
            className={`cursor-pointer ${isHomePage ? "text-[#251455] fill-[#251455]" : "text-primary"
              }`}
          />
        </Link>
        <Bell size={30} className="text-primary cursor-pointer" />
        <MessageSquare size={30} className="text-primary cursor-pointer" />

        <Link to="/profile">
          <img
            src={userAvatar || "/Grouph.png"}
            alt={userName || "User"}
            className={`w-9 h-9 mr-4 cursor-pointer rounded-full object-cover
          ${isProfilePage ? "border-2 border-brand-purple" : ""}
        `}
          />
        </Link>
      </div>
    </header>
  );
}
