import { useRef, useState, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { Button } from "@/shared/components/ui/button";

export const ProfileUploadPhoto = () => {
    const { data: user, isLoading } = useCurrentUser();
    const { mutate: updateProfile, isPending } = useUpdateProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    //todo: edit form handle

    useEffect(() => {
        if (successMsg || errorMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg(null);
                setErrorMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg, errorMsg]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg(null);
        setSuccessMsg(null);
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg"];
        const allowedExtensions = [".png", ".jpg", ".jpeg"];

        const fileTypeValid = allowedTypes.includes(file.type);
        const fileExtValid = allowedExtensions.some(ext =>
            file.name.toLowerCase().endsWith(ext)
        );

        if (!fileTypeValid || !fileExtValid) {
            setErrorMsg("Only PNG and JPG images are allowed.");
            e.target.value = "";
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        const formData = new FormData();
        formData.append("file", file);

        updateProfile(formData, {
            onSuccess: () => {
                setSuccessMsg("Photo uploaded successfully!");
            },
            onError: (err) => {
                setErrorMsg("Failed to upload photo. Please try again.");
                console.error(err);
                setPreviewUrl(null);
            }
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const displayAvatar = previewUrl || user?.assets?.[0]?.url || user?.avatar || "";

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8">
            <div className="relative shrink-0">
                <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                    {isLoading ? (
                        <div className="w-full h-full animate-pulse bg-gray-200" />
                    ) : displayAvatar ? (
                        <img
                            src={displayAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UserIcon className="w-12 h-12 text-gray-400" />
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4 items-center sm:items-start w-full sm:w-auto">
                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                    <Button
                        variant="outline"
                        onClick={handleUploadClick}
                        disabled={isPending}
                        className="w-full sm:w-[200px] h-[56px] px-[16px] py-[20px] rounded-[103px] border border-gray-200 bg-transparent hover:bg-gray-50 font-[Poppins] font-bold text-[18px] text-[#251455] leading-[1.2]"
                    >
                        {isPending ? "Uploading..." : "Upload new photo"}
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, image/jpg"
                        className="hidden"
                    />
                </div>
                {errorMsg && (
                    <p className="text-sm text-red-500 font-medium text-center sm:text-left w-full">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="text-sm text-green-600 font-medium text-center sm:text-left w-full">
                        {successMsg}
                    </p>
                )}
                <p className="font-[Poppins] font-medium text-[14px] text-[#6E6E6E] leading-[1.2] max-w-[660px] text-center sm:text-left">
                    At least 800×800 px recommended.<br />
                    JPG or PNG is allowed
                </p>
            </div>
        </div>
    );
};
