import { 
  Search, 
  ChevronDown, 
  Calendar, 
  Download, 
  Eye, 
  Ban,
  AlertTriangle,
  Check,
  Undo2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/utils";
import { useState } from "react";
import { 
  useSearchUsers, 
  useSuspendUser, 
  useBanUser, 
  useToggleUserStatus,
  useExportUsers 
} from "../hooks/useAdminUsers";
import { toast } from "sonner";

export function UsersTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("All status");
  const [registrationDate, setRegistrationDate] = useState("");

  const { data, isLoading } = useSearchUsers(
    query, 
    page, 
    limit, 
    statusFilter === "All status" ? undefined : statusFilter,
    registrationDate || undefined
  );

  const suspendMutation = useSuspendUser();
  const banMutation = useBanUser();
  const toggleStatusMutation = useToggleUserStatus();
  const exportMutation = useExportUsers();

  const handleModeration = async (action: 'suspend' | 'ban' | 'toggle', user: any) => {
    try {
      if (action === 'suspend') {
        if (confirm(`Are you sure you want to suspend ${user.name}?`)) {
          await suspendMutation.mutateAsync(Number(user.id));
          toast.success(`User ${user.name} suspended`);
        }
      } else if (action === 'ban') {
        if (confirm(`Are you sure you want to ban ${user.name}?`)) {
          await banMutation.mutateAsync(Number(user.id));
          toast.success(`User ${user.name} banned`);
        }
      } else if (action === 'toggle') {
        const actionLabel = user.customerStatus === 'ACTIVE' ? 'restrict' : 'activate';
        if (confirm(`Are you sure you want to ${actionLabel} ${user.name}?`)) {
          await toggleStatusMutation.mutateAsync(String(user.id));
          toast.success(`User ${user.name} ${actionLabel}d`);
        }
      }
    } catch (error) {
      toast.error(`Action failed for ${user.name}`);
    }
  };

  const handleExport = () => {
    exportMutation.mutate({ 
      dto: { search: query, role: 'USER' },
      format: 'xlsx' 
    });
  };

  const totalPages = data?.meta?.totalPages || (data ? Math.ceil((data as any).total / limit) : 1);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full h-[56px] pl-[64px] pr-6 bg-bg-primary/30 rounded-2xl border border-border-default/30 outline-none focus:border-brand-purple/30 text-[16px] font-[Poppins] transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="appearance-none h-[56px] px-8 pr-12 rounded-2xl border border-border-default/30 bg-white text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all outline-none cursor-pointer"
            >
              <option value="All status">All status</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BANNED">Banned</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-third pointer-events-none" />
            <input 
              type="date"
              value={registrationDate}
              onChange={(e) => {
                setRegistrationDate(e.target.value);
                setPage(1);
              }}
              className="h-[56px] pl-[56px] pr-6 rounded-2xl border border-border-default/30 bg-white text-[16px] font-semibold text-text-secondary hover:bg-bg-primary/50 transition-all outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="h-[56px] px-10 bg-brand-purple text-white rounded-2xl flex items-center gap-3 font-bold text-[16px] shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download size={20} />
            {exportMutation.isPending ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
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
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight">Regestration Date <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center">Status</th>
              <th className="px-8 py-6 text-[14px] font-bold text-text-primary uppercase tracking-tight text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default/10">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-text-secondary animate-pulse">Loading users...</td>
              </tr>
            ) : !data || (data as any).data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-text-secondary">No users found.</td>
              </tr>
            ) : (data as any).data.map((user: any) => (
              <tr key={user.id} className="hover:bg-bg-primary/40 transition-all group">
                <td className="px-8 py-6">
                  <input type="checkbox" className="w-6 h-6 rounded border-border-default text-brand-purple focus:ring-brand-purple cursor-pointer" />
                </td>
                <td className="px-8 py-6 text-[16px] font-bold text-text-secondary">#{user.id}</td>
                <td className="px-8 py-6">
                  <Link 
                    to="/admin/users/$userId" 
                    params={{ userId: String(user.id) }}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                      alt={user.name} 
                      className="w-[52px] h-[52px] rounded-full object-cover border-2 border-white shadow-sm shrink-0" 
                    />
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[16px] font-bold text-[#251455] truncate">{user.name}</span>
                      <span className="text-[14px] text-text-third font-medium truncate">{user.email}</span>
                    </div>
                  </Link>
                </td>
                <td className="px-8 py-6">
                   <span className="text-[14px] font-bold text-text-primary">{user.phoneNumber}</span>
                </td>
                <td className="px-8 py-6 text-[14px] font-medium text-text-secondary">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-[12px] font-bold inline-block",
                    user.customerStatus === 'ACTIVE' ? "bg-state-success/10 text-status-active" : 
                    user.customerStatus === 'BANNED' ? "bg-status-canceled/10 text-status-canceled" :
                    "bg-[#FFECC1]/30 text-[#FFB000]"
                  )}>
                    {user.customerStatus === 'ACTIVE' ? 'Active' : 
                     user.customerStatus === 'BANNED' ? 'Banned' : 'Suspended'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <Link 
                      to="/admin/users/$userId" 
                      params={{ userId: String(user.id) }}
                      className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-brand-purple"
                      title="View Profile"
                    >
                      <Eye size={20} />
                    </Link>
                    
                    {/* Conditional Actions based on Status */}
                    {user.customerStatus === 'ACTIVE' && (
                      <>
                        <button 
                          onClick={() => handleModeration('suspend', user)}
                          className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-[#FFB000]"
                          title="Suspend User"
                        >
                          <AlertTriangle size={20} />
                        </button>
                        <button 
                          onClick={() => handleModeration('ban', user)}
                          className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-status-canceled"
                          title="Ban User"
                        >
                          <Ban size={20} />
                        </button>
                      </>
                    )}

                    {user.customerStatus === 'SUSPENDED' && (
                      <>
                        <button 
                          onClick={() => handleModeration('toggle', user)}
                          className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-status-active"
                          title="Activate User"
                        >
                          <Check size={20} />
                        </button>
                        <button 
                          onClick={() => handleModeration('ban', user)}
                          className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-status-canceled"
                          title="Ban User"
                        >
                          <Ban size={20} />
                        </button>
                      </>
                    )}

                    {user.customerStatus === 'BANNED' && (
                      <button 
                        onClick={() => handleModeration('toggle', user)}
                        className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-text-secondary hover:text-brand-purple"
                        title="Restore User"
                      >
                        <Undo2 size={20} />
                      </button>
                    )}
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
            <span className="text-[16px] text-text-secondary font-bold">Total result: {data?.total || 0}</span>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-3 rounded-lg hover:bg-white hover:shadow-md disabled:opacity-30 transition-all active:scale-90"
            >
                <ChevronDown size={24} className="rotate-90" />
            </button>
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                   <button 
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                        "w-12 h-12 rounded-2xl font-bold text-[16px] transition-all",
                        page === p ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20" : "hover:bg-white text-text-secondary hover:shadow-sm"
                    )}
                   >
                    {p}
                   </button>
                ))}
            </div>
            <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-3 rounded-lg hover:bg-white hover:shadow-md disabled:opacity-30 transition-all active:scale-90"
            >
                <ChevronDown size={24} className="-rotate-90" />
            </button>
        </div>
      </div>
    </div>
  );
}
