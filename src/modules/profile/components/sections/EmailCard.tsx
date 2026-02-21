import { Mail } from "lucide-react";
import type { User } from "@/modules/Auth/dto/AuthDto";
import { INPUT_BASE, FIELD_WRAP_STYLE } from "./profileShared";

interface EmailCardProps {
    user: User;
    isEditing: boolean;
    email: string;
    onEmailChange: (v: string) => void;
    emailError?: string;
}

export const EmailCard = ({
    user,
    isEditing,
    email,
    onEmailChange,
    emailError,
}: EmailCardProps) => (
    <div className="flex flex-col justify-center gap-[8px] rounded-[16px] border border-(--colors-border-border,#DBDBDB) p-[24px] bg-white flex-1 min-w-[300px] min-h-[133px]">
        <h2 className="font-[Poppins] font-semibold text-[24px] leading-[1.2] text-(--colors-Text-primary,#251455) mb-2">
            Email
        </h2>

        {isEditing ? (
            <div className="flex flex-col gap-1">
                <div style={FIELD_WRAP_STYLE}>
                    <Mail className="text-(--colors-brand-Purple,#6B39F4) shrink-0" size={20} />
                    <input
                        className={`${INPUT_BASE} text-[16px]`}
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="email@example.com"
                    />
                </div>
                {emailError && (
                    <span className="font-[Poppins] text-[12px] text-red-500">{emailError}</span>
                )}
            </div>
        ) : (
            <div className="flex items-center gap-3">
                <Mail className="text-(--colors-brand-Purple,#6B39F4) shrink-0" size={24} />
                <span className="font-[Poppins] font-medium text-[20px] leading-[1.2] text-(--colors-Text-primary,#251455) truncate">
                    {user.email || "N/A"}
                </span>
            </div>
        )}
    </div>
);
