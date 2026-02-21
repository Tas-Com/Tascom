import { Smartphone } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import type { User } from "@/modules/Auth/dto/AuthDto";
import { INPUT_BASE, FIELD_WRAP_STYLE } from "./profileShared";

interface PhoneCardProps {
    user: User;
    isEditing: boolean;
    phone: string;
    onPhoneChange: (v: string) => void;
    phoneError?: string;
}

export const PhoneCard = ({
    user,
    isEditing,
    phone,
    onPhoneChange,
    phoneError,
}: PhoneCardProps) => (
    <div className="flex flex-col justify-center gap-[8px] rounded-[16px] border border-(--colors-border-border,#DBDBDB) p-[24px] bg-white flex-1 min-w-[300px] min-h-[133px] relative">
        <h2 className="font-[Poppins] font-semibold text-[24px] leading-[1.2] text-(--colors-Text-primary,#251455) mb-2">
            Phone
        </h2>

        {isEditing ? (
            <div className="flex flex-col gap-1">
                <div style={{ ...FIELD_WRAP_STYLE, paddingRight: "40px" }}>
                    <Smartphone className="text-(--colors-brand-Purple,#6B39F4) shrink-0" size={20} />
                    <input
                        className={`${INPUT_BASE} text-[16px]`}
                        type="tel"
                        value={phone}
                        onChange={(e) => onPhoneChange(e.target.value)}
                        placeholder="059-000-0000"
                    />
                </div>
                {phoneError && (
                    <span className="font-[Poppins] text-[12px] text-red-500">{phoneError}</span>
                )}
            </div>
        ) : (
            <div className="flex items-center gap-3">
                <Smartphone className="text-(--colors-brand-Purple,#6B39F4) shrink-0" size={24} />
                <span className="font-[Poppins] font-medium text-[20px] leading-[1.2] text-(--colors-Text-primary,#251455) truncate">
                    {user.phoneNumber || "N/A"}
                </span>
            </div>
        )}

        {/* Flag – always visible */}
        <div className="absolute right-[24px] top-1/2 -translate-y-1/2 flex items-center">
            <ReactCountryFlag countryCode="PS" svg style={{ width: "28px", height: "21px" }} />
        </div>
    </div>
);
