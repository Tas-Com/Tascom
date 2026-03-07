import { 
  Search, 
  ChevronDown, 
  Calendar, 
  Download, 
  Eye, 
  AlertCircle, 
  Ban, 
  RotateCcw, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/shared/utils";

const MOCK_USERS = [
  { 
    id: '#1287', 
    name: 'Samir Ali', 
    email: 'samir-ali@gmail.com', 
    avatar: '/Samir.jpg', 
    contact: '+970 793 6416', 
    date: 'Jan 16, 2026', 
    status: 'Active' 
  },
  { 
    id: '#1288', 
    name: 'Sabri Lahham', 
    email: 'sabrilahham@gmail.com', 
    avatar: '/Sabri.jpg', 
    contact: '+970 938 2918', 
    date: 'May 23, 2025', 
    status: 'Banned' 
  },
  { 
    id: '#1289', 
    name: 'Adel Saeed', 
    email: 'adelsaeed2@gmail.com', 
    avatar: '/Adel.jpg', 
    contact: '+970 543 2129', 
    date: 'Feb 11, 2025', 
    status: 'Suspended' 
  },
  { 
    id: '#1290', 
    name: 'Khaled Khalil', 
    email: 'khaledkh4@gmail.com', 
    avatar: '/Khaled.jpg', 
    contact: '+970 928 1773', 
    date: 'Mar 15, 2025', 
    status: 'Active' 
  },
  { 
    id: '#1291', 
    name: 'Omar Jaber', 
    email: 'omarjaber1@gmail.com', 
    avatar: '/Omar.jpg', 
    contact: '+970 123 6987', 
    date: 'Dec 5, 2023', 
    status: 'Active' 
  },
  { 
    id: '#1292', 
    name: 'Osaid Farhan', 
    email: 'osaidfarhan5@gmail.com', 
    avatar: '/Osaid.jpg', 
    contact: '+970 792 1135', 
    date: 'Oct 19, 2024', 
    status: 'Suspended' 
  },
  { 
    id: '#1293', 
    name: 'Rami Khatib', 
    email: 'ramikhatib23@hotmail.com', 
    avatar: '/Rami.jpg', 
    contact: '+970 558 1298', 
    date: 'Apr 12, 2025', 
    status: 'Active' 
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Active':
      return "bg-state-success/10 text-status-active";
    case 'Banned':
      return "bg-status-canceled/10 text-status-canceled";
    case 'Suspended':
      return "bg-priority-medium-bg text-priority-medium-text";
    default:
      return "bg-bg-primary text-text-secondary";
  }
};

const getActions = (status: string) => {
  const commonActions = [
    { icon: Eye, color: 'text-text-secondary hover:text-brand-purple', label: 'View Profile' }
  ];

  switch (status) {
    case 'Active':
      return [
        ...commonActions,
        { icon: AlertCircle, color: 'text-text-secondary hover:text-amber-500', label: 'Suspend' },
        { icon: Ban, color: 'text-text-secondary hover:text-status-canceled', label: 'Ban' },
      ];
    case 'Banned':
      return [
        ...commonActions,
        { icon: RotateCcw, color: 'text-text-secondary hover:text-status-active', label: 'Unban' },
      ];
    case 'Suspended':
      return [
        ...commonActions,
        { icon: CheckCircle2, color: 'text-text-secondary hover:text-status-active', label: 'Activate' },
        { icon: Ban, color: 'text-text-secondary hover:text-status-canceled', label: 'Ban' },
      ];
    default:
      return commonActions;
  }
};

export function UsersTable() {
  return (
    <div className="bg-white rounded-[24px] border border-border-default/50 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Table Filters Header */}
      <div className="p-8 border-b border-border-default/20 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-[440px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-third" size={20} />
            <input 
              type="text" 
              placeholder="Search for a user" 
              className="w-full h-[56px] pl-[64px] pr-6 bg-bg-primary/30 rounded-2xl border border-border-default/30 outline-none focus:border-brand-purple/30 text-[16px] font-[Poppins] transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <button className="h-[56px] px-8 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all">
            All status <ChevronDown size={18} />
          </button>

          {/* Date Picker Mock */}
          <button className="h-[56px] px-8 rounded-2xl border border-border-default/30 flex items-center gap-3 text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all text-text-third">
            dd/mm/yyyy <Calendar size={18} />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-[16px] text-text-secondary font-bold">3 selected</span>
          <button className="h-[56px] px-10 bg-brand-purple text-white rounded-2xl flex items-center gap-3 font-bold text-[16px] shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 active:scale-95 transition-all">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto h-[600px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="bg-bg-primary/30 border-b border-border-default/20">
              <th className="px-8 py-6 w-[80px]">
                <input type="checkbox" className="w-6 h-6 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer" />
              </th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight">
                User ID <ChevronDown size={14} className="inline ml-1" />
              </th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight">
                User Profile <ChevronDown size={14} className="inline ml-1" />
              </th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight">Contact</th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight">
                Registration Date <ChevronDown size={14} className="inline ml-1" />
              </th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center">Status</th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default/10">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-bg-primary/40 transition-all group">
                <td className="px-8 py-6">
                  <input type="checkbox" className="w-6 h-6 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer" />
                </td>
                <td className="px-8 py-6 text-[16px] font-bold text-text-secondary">{user.id}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-[52px] h-[52px] rounded-full object-cover border-2 border-white shadow-sm shrink-0" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name='+user.name+'&background=random'; }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[16px] font-bold text-[#251455] truncate">{user.name}</span>
                      <span className="text-[14px] text-text-third font-medium truncate">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-[16px] font-semibold text-text-secondary whitespace-nowrap">{user.contact}</td>
                <td className="px-8 py-6">
                  <span className="text-[16px] font-bold text-text-primary">{user.date}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn("px-6 py-2 rounded-full text-[13px] font-bold inline-block min-w-[120px] transition-all", getStatusStyles(user.status))}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    {getActions(user.status).map((action, idx) => (
                      <button 
                        key={idx}
                        title={action.label}
                        className={cn(
                          "p-3 hover:bg-white hover:shadow-md rounded-xl transition-all active:scale-90",
                          action.color
                        )}
                      >
                        <action.icon size={22} />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-8 bg-bg-primary/20 border-t border-border-default/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <span className="text-[16px] text-text-secondary font-bold">Show result:</span>
            <select className="h-[44px] min-w-[80px] px-4 bg-white rounded-xl border border-border-default/30 text-[16px] font-bold outline-none cursor-pointer hover:border-brand-purple/30 transition-all font-[Poppins]">
                <option>7</option>
                <option>10</option>
                <option>20</option>
            </select>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="p-3 rounded-lg hover:bg-white hover:shadow-md disabled:opacity-30 transition-all active:scale-90">
                <ChevronDown size={24} className="rotate-90" />
            </button>
            <div className="flex items-center gap-2">
                <button className="w-12 h-12 rounded-2xl bg-brand-purple text-white font-bold text-[16px] shadow-lg shadow-brand-purple/20 active:scale-95 transition-all">1</button>
                <button className="w-12 h-12 rounded-2xl hover:bg-white text-text-secondary font-bold text-[16px] transition-all hover:shadow-sm">2</button>
                <button className="w-12 h-12 rounded-2xl hover:bg-white text-text-secondary font-bold text-[16px] transition-all hover:shadow-sm">3</button>
            </div>
            <button className="p-3 rounded-lg hover:bg-white hover:shadow-md transition-all active:scale-90">
                <ChevronDown size={24} className="-rotate-90" />
            </button>
        </div>
      </div>
    </div>
  );
}
