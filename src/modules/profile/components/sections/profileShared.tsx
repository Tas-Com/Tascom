export const INPUT_BASE =
    "font-[Poppins] font-medium text-[18px] text-(--colors-Text-primary,#251455) bg-transparent outline-none w-full";

export const CARD_CLASS =
    "rounded-[16px] border border-(--colors-border-border,#DBDBDB) p-[24px] bg-white w-full";

export const CARD_TITLE_CLASS =
    "font-[Poppins] font-semibold text-[24px] leading-[1.2] text-(--colors-Text-primary,#251455)";

export const FIELD_WRAP_STYLE: React.CSSProperties = {
    width: "100%",
    maxWidth: "341px",
    height: "28px",
    paddingBottom: "4px",
    borderBottom: "1px solid #DEDEDE",
    display: "flex",
    alignItems: "center",
    gap: "8px",
};

interface FieldProps {
    label: string;
    isEditing: boolean;
    viewNode: React.ReactNode;
    editNode: React.ReactNode;
    error?: string;
    wrapStyle?: React.CSSProperties;
}

export const Field = ({
    label,
    isEditing,
    viewNode,
    editNode,
    error,
    wrapStyle,
}: FieldProps) => (
    <div className="flex flex-col gap-[8px]">
        <span className="font-[Poppins] font-semibold text-[18px] leading-[1.2] text-(--colors-Text-third,#6E6E6E)">
            {label}
        </span>
        {isEditing ? (
            <>
                <div style={wrapStyle ?? FIELD_WRAP_STYLE}>{editNode}</div>
                {error && (
                    <span className="font-[Poppins] text-[12px] text-red-500">{error}</span>
                )}
            </>
        ) : (
            <span className="font-[Poppins] font-medium text-[20px] leading-[1.2] text-(--colors-Text-primary,#251455)">
                {viewNode}
            </span>
        )}
    </div>
);
