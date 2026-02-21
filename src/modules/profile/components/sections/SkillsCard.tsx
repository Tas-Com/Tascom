import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AVAILABLE_SKILLS } from "../../data/skills";
import { CARD_CLASS, CARD_TITLE_CLASS } from "./profileShared";

interface SkillsCardProps {
    selectedSkills: string[];
    isEditing: boolean;
    onAddSkill: (skill: string) => void;
    onRemoveSkill: (skill: string) => void;
}

export const SkillsCard = ({
    selectedSkills,
    isEditing,
    onAddSkill,
    onRemoveSkill,
}: SkillsCardProps) => {
    const [skillSearch, setSkillSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (!isEditing) {
            setSkillSearch("");
            setShowDropdown(false);
        }
    }, [isEditing]);

    const filteredSkills = AVAILABLE_SKILLS.filter(
        (s) =>
            s.toLowerCase().includes(skillSearch.toLowerCase()) &&
            !selectedSkills.includes(s)
    );

    const handleAdd = (skill: string) => {
        onAddSkill(skill);
        setSkillSearch("");
        setShowDropdown(false);
    };

    return (
        <div className={`${CARD_CLASS} flex flex-col gap-[16px]`}>
            <div className="flex flex-wrap items-center gap-4">
                <h2 className={CARD_TITLE_CLASS}>Skills</h2>

                {isEditing && (
                    <div ref={containerRef} className="relative flex-1" style={{ minWidth: "240px" }}>
                        <input
                            type="text"
                            value={skillSearch}
                            onChange={(e) => {
                                setSkillSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Search skills (e.g. tutoring, cleaning, design)"
                            style={{
                                width: "100%",
                                maxWidth: "740px",
                                height: "48px",
                                padding: "8px 16px",
                                borderRadius: "16px",
                                border: "0.5px solid #DEDEDE",
                                outline: "none",
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "120%",
                                color: "#251455",
                                background: "white",
                            }}
                            className="placeholder-[#606060]"
                        />

                        {showDropdown && filteredSkills.length > 0 && (
                            <div
                                className="absolute z-20 mt-1 bg-white rounded-[12px] shadow-lg border border-[#DEDEDE] overflow-y-auto"
                                style={{ width: "100%", maxWidth: "740px", maxHeight: "220px" }}
                            >
                                {filteredSkills.map((skill) => (
                                    <button
                                        key={skill}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleAdd(skill);
                                        }}
                                        className="w-full text-left px-4 py-2 font-[Poppins] text-[14px] text-(--colors-Text-primary,#251455) hover:bg-(--colors-background-card-hover,#F4F0FF) transition-colors"
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-[12px]">
                {selectedSkills.length > 0 ? (
                    selectedSkills.map((skill) => (
                        <div
                            key={skill}
                            className="flex items-center gap-[6px] rounded-[8px] bg-(--colors-background-card-hover,#F4F0FF) px-[14px] py-[6px] h-[40px]"
                        >
                            <span className="font-[Poppins] font-medium text-[16px] text-(--colors-Text-primary,#251455)">
                                {skill}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveSkill(skill)}
                                className="ml-1 flex items-center justify-center text-(--colors-Text-third,#6E6E6E) hover:text-red-500 transition-colors cursor-pointer"
                                aria-label={`Remove ${skill}`}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="font-[Poppins] font-normal text-[16px] leading-[1.4] text-(--colors-Text-third,#6E6E6E) italic">
                        No skills added yet.
                    </p>
                )}
            </div>
        </div>
    );
};
