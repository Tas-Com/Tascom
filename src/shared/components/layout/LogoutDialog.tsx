import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutDialog({ isOpen, onClose, onConfirm }: LogoutDialogProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div className="relative w-full max-w-[500px] bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className="w-[100px] h-[100px] bg-brand-purple/5 rounded-full flex items-center justify-center mb-8">
            <div className="w-[70px] h-[70px] bg-brand-purple/10 rounded-full flex items-center justify-center">
              <LogOut size={36} className="text-brand-purple" />
            </div>
          </div>

          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-4">Logout ?</h2>
          
          <p className="text-[18px] text-text-secondary leading-relaxed mb-10 max-w-[360px]">
            Are you sure you want to logout?
            You will need to sign in again to access your account and tasks.
          </p>

          <div className="flex items-center gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 h-[64px] rounded-full border border-[#D9D9D9] text-[18px] font-bold text-text-secondary hover:bg-bg-primary transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-[64px] rounded-full bg-brand-purple text-white text-[18px] font-bold shadow-lg shadow-brand-purple/20 hover:bg-brand-purple/90 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
