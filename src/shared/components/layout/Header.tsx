import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

type HeaderProps = {
  userName: string;
  userAvatar: string;
  logoSrc: string;
};

export function Header({ userName, userAvatar, logoSrc }: HeaderProps) {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">

      <div className="flex items-center gap-2">
        <img src={logoSrc} alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-brand-purple">
          Tascom
        </span>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-96">
        <SearchIcon className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-body-s1">Tasks ▾</button>
        <NotificationsIcon />

        {/* api imag */}
        <img
          src={userAvatar}
          alt={userName}
          className="w-9 h-9 rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
}
