import { useEffect, useState } from "react";
import type { User } from "@/modules/Auth/dto/AuthDto";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { PersonalInfoCard } from "./sections/PersonalInfoCard";
import { EmailCard } from "./sections/EmailCard";
import { PhoneCard } from "./sections/PhoneCard";
import { SkillsCard } from "./sections/SkillsCard";
import { BioCard } from "./sections/BioCard";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;

const parseSkills = (raw: string | null | undefined): string[] =>
    raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];

const parseDob = (dob: Date | undefined | null): string =>
    dob ? new Date(dob).toISOString().split("T")[0] : "";

interface ProfileDetailsProps {
    user: User;
    isEditing: boolean;
    saveSignal: number;
    onSaveSuccess: () => void;
}

export const ProfileDetails = ({
    user,
    isEditing,
    saveSignal,
    onSaveSuccess,
}: ProfileDetailsProps) => {
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [name, setName] = useState(user.name ?? "");
    const [dob, setDob] = useState(parseDob(user.DOB));
    const [gender, setGender] = useState(user.gender ?? "");
    const [email, setEmail] = useState(user.email ?? "");
    const [phone, setPhone] = useState(user.phoneNumber ?? "");
    const [selectedSkills, setSelectedSkills] = useState<string[]>(parseSkills(user.skills));
    const [bio, setBio] = useState(user.about ?? "");

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!isEditing) {
            setName(user.name ?? "");
            setDob(parseDob(user.DOB));
            setGender(user.gender ?? "");
            setEmail(user.email ?? "");
            setPhone(user.phoneNumber ?? "");
            setSelectedSkills(parseSkills(user.skills));
            setBio(user.about ?? "");
            setErrors({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing]);

    useEffect(() => {
        if (saveSignal > 0) handleSubmit();
    }, [saveSignal]);

    const validate = (): boolean => {
        const next: Record<string, string> = {};

        if (name.trim().length < 3)
            next.name = "Full name must be at least 3 characters.";
        if (!dob)
            next.dob = "Date of birth is required.";
        else if (new Date(dob) >= new Date())
            next.dob = "Date of birth must be in the past.";
        if (!gender)
            next.gender = "Please select a gender.";
        if (!emailRegex.test(email))
            next.email = "Please enter a valid email address.";
        if (!phoneRegex.test(phone.replace(/\s/g, "")))
            next.phone = "Please enter a valid phone number (7–15 digits).";

        const wordCount = bio.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 10)
            next.bio = `Bio must be at least 10 words (currently ${wordCount}).`;

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("DOB", dob);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("phoneNumber", phone);
        formData.append("skills", selectedSkills.join(","));
        formData.append("about", bio);

        updateProfile(formData, { onSuccess: () => onSaveSuccess() });
    };

    const handleAddSkill = (skill: string) =>
        setSelectedSkills((prev) => [...prev, skill]);

    const handleRemoveSkill = (skill: string) =>
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));

    return (
        <div className="flex flex-col gap-[24px] w-full">

            <PersonalInfoCard
                user={user}
                isEditing={isEditing}
                name={name}
                onNameChange={setName}
                nameError={errors.name}
                dob={dob}
                onDobChange={setDob}
                dobError={errors.dob}
                gender={gender}
                onGenderChange={setGender}
                genderError={errors.gender}
            />

            <div className="flex flex-row flex-wrap gap-[16px] w-full items-stretch">
                <EmailCard
                    user={user}
                    isEditing={isEditing}
                    email={email}
                    onEmailChange={setEmail}
                    emailError={errors.email}
                />
                <PhoneCard
                    user={user}
                    isEditing={isEditing}
                    phone={phone}
                    onPhoneChange={setPhone}
                    phoneError={errors.phone}
                />
            </div>

            <SkillsCard
                selectedSkills={selectedSkills}
                isEditing={isEditing}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
            />

            <BioCard
                user={user}
                isEditing={isEditing}
                bio={bio}
                onBioChange={setBio}
                bioError={errors.bio}
            />

            {isPending && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="bg-white rounded-2xl px-8 py-6 shadow-xl font-[Poppins] text-[16px] font-medium text-(--colors-Text-primary,#251455)">
                        Saving changes…
                    </div>
                </div>
            )}
        </div>
    );
};
