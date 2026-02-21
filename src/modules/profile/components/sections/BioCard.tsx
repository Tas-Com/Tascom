import type { User } from "@/modules/Auth/dto/AuthDto";
import { CARD_CLASS, CARD_TITLE_CLASS } from "./profileShared";

interface BioCardProps {
    user: User;
    isEditing: boolean;
    bio: string;
    onBioChange: (v: string) => void;
    bioError?: string;
}

export const BioCard = ({
    user,
    isEditing,
    bio,
    onBioChange,
    bioError,
}: BioCardProps) => (
    <div className={`${CARD_CLASS} flex flex-col gap-[16px]`}>
        <h2 className={CARD_TITLE_CLASS}>Bio</h2>

        {isEditing ? (
            <div className="flex flex-col gap-1">
                <textarea
                    value={bio}
                    onChange={(e) => onBioChange(e.target.value)}
                    rows={5}
                    placeholder="Tell others about yourself... (minimum 10 words)"
                    className="w-full font-[Poppins] font-normal text-[16px] leading-[1.6] text-(--colors-Text-primary,#251455) placeholder-[#6E6E6E] bg-transparent border border-[#DEDEDE] rounded-[12px] p-3 outline-none resize-none focus:border-(--colors-brand-Purple,#6B39F4) transition-colors"
                />
                {bioError && (
                    <span className="font-[Poppins] text-[12px] text-red-500">{bioError}</span>
                )}
            </div>
        ) : user.about ? (
            <p className="font-[Poppins] font-normal text-[20px] leading-[1.4] text-(--colors-Text-primary,#251455) whitespace-pre-wrap">
                {user.about}
            </p>
        ) : (
            <p className="font-[Poppins] font-normal text-[16px] leading-[1.4] text-(--colors-Text-third,#6E6E6E) italic">
                No bio added yet.
            </p>
        )}
    </div>
);
