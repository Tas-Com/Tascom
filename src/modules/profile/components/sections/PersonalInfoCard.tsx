import type { User } from "@/modules/Auth/dto/AuthDto";
import { Field, INPUT_BASE, CARD_CLASS, CARD_TITLE_CLASS } from "./profileShared";

interface PersonalInfoCardProps {
    user: User;
    isEditing: boolean;
    name: string;
    onNameChange: (v: string) => void;
    nameError?: string;
    dob: string;
    onDobChange: (v: string) => void;
    dobError?: string;
    gender: string;
    onGenderChange: (v: string) => void;
    genderError?: string;
}

export const PersonalInfoCard = ({
    user,
    isEditing,
    name,
    onNameChange,
    nameError,
    dob,
    onDobChange,
    dobError,
    gender,
    onGenderChange,
    genderError,
}: PersonalInfoCardProps) => {
    const dobText = user.DOB
        ? new Date(user.DOB).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "N/A";

    const genderText = user.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : "Not specified";

    return (
        <div className={CARD_CLASS}>
            <h2 className={`${CARD_TITLE_CLASS} mb-6`}>Personal Info</h2>

            <div className="flex flex-wrap gap-[8px] w-full">
                <div className="flex-1 min-w-[180px]">
                    <Field
                        label="Full Name"
                        isEditing={isEditing}
                        viewNode={user.name || "N/A"}
                        error={nameError}
                        editNode={
                            <input
                                className={INPUT_BASE}
                                type="text"
                                value={name}
                                onChange={(e) => onNameChange(e.target.value)}
                                placeholder="Full name"
                            />
                        }
                    />
                </div>

                <div className="flex-1 min-w-[180px]">
                    <Field
                        label="Date of Birth"
                        isEditing={isEditing}
                        viewNode={dobText}
                        error={dobError}
                        editNode={
                            <input
                                className={`${INPUT_BASE} text-[16px] cursor-pointer`}
                                type="date"
                                value={dob}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => onDobChange(e.target.value)}
                            />
                        }
                    />
                </div>

                <div className="flex-1 min-w-[150px]">
                    <Field
                        label="Gender"
                        isEditing={isEditing}
                        viewNode={genderText}
                        error={genderError}
                        editNode={
                            <select
                                className={`${INPUT_BASE} text-[16px] cursor-pointer`}
                                value={gender}
                                onChange={(e) => onGenderChange(e.target.value)}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        }
                    />
                </div>
            </div>
        </div>
    );
};
