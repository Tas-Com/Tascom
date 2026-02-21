import { Pencil } from "lucide-react";
import { useState } from "react";
import { ProfileUploadPhoto } from "../components/ProfileUploadPhoto";
import { ProfileDetails } from "../components/ProfileDetails";
import { useCurrentUser } from "../hooks/useCurrentUser";

const ProfilePage = () => {
  const { data: user, isLoading } = useCurrentUser();
  // console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [saveSignal, setSaveSignal] = useState(0);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setSaveSignal((s) => s + 1);
  const handleSaveSuccess = () => setIsEditing(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[970px]">
      <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] tracking-normal text-(--colors-Text-primary,#251455)">
        Edit Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <ProfileUploadPhoto />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex justify-end items-center gap-3 w-full">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center w-[125px] h-[48px] gap-[8px] px-[16px] rounded-[103px] border border-(--colors-brand-Purple,#6B39F4) bg-white text-(--colors-brand-Purple,#6B39F4) hover:bg-purple-50 transition-colors cursor-pointer font-[Poppins] font-semibold text-[16px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center w-[125px] h-[48px] gap-[8px] px-[16px] rounded-[103px] border border-transparent bg-(--colors-brand-Purple,#6B39F4) text-white hover:opacity-90 transition-opacity cursor-pointer font-[Poppins] font-semibold text-[16px]"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center w-[125px] h-[48px] gap-[8px] px-[16px] rounded-[103px] border border-transparent bg-(--colors-brand-Purple,#6B39F4) text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Pencil size={20} strokeWidth={2} />
              <span className="font-[Poppins] font-semibold text-[16px]">Edit</span>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-6">
            <div className="h-40 bg-gray-100 rounded-xl w-full"></div>
            <div className="flex gap-4">
              <div className="h-32 bg-gray-100 rounded-xl w-full"></div>
              <div className="h-32 bg-gray-100 rounded-xl w-full"></div>
            </div>
          </div>
        ) : user ? (
          <ProfileDetails
            user={user}
            isEditing={isEditing}
            saveSignal={saveSignal}
            onSaveSuccess={handleSaveSuccess}
          />
        ) : (
          <div className="text-center text-gray-500 py-8 font-[Poppins]">
            Failed to load user data.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
