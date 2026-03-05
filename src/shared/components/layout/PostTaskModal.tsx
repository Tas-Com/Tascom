import { useState } from "react";
import {
  X,
  ImagePlus,
  Check,
  Rabbit,
  Flame,
  MapPin,
  Calendar,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useCreateTask } from "@/modules/tasks/hooks/useTasks";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import userDefaultImg from "@/assets/user.jpg";
import {
  apiCategories,
  getCategoryValue,
  getLocationOptions,
} from "@/shared/utils";

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostTaskModal({ isOpen, onClose }: PostTaskModalProps) {
  // All hooks MUST be called before any conditional returns (React rules of hooks)
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const createTask = useCreateTask();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string>("");

  // Conditional returns AFTER all hooks
  if (!isOpen) return null;

  if (userLoading) {
    return (
      <div className="fixed inset-0 z-200 bg-black/40 flex justify-center items-center p-2 sm:p-4">
        <div className="bg-white w-full max-w-105 md:max-w-120 lg:max-w-135 xl:max-w-160 2xl:max-w-200 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DFDFDF] p-4 sm:p-5 lg:p-6 relative shadow-xl">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-200 bg-black/40 flex justify-center items-center p-2 sm:p-4">
        <div className="bg-white w-full max-w-105 md:max-w-120 lg:max-w-135 xl:max-w-160 2xl:max-w-200 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DFDFDF] p-4 sm:p-5 lg:p-6 relative shadow-xl">
          <div className="flex justify-center items-center h-40">
            <p className="text-text-secondary">Please log in to post a task</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-brand-purple text-white rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handlePost = async () => {
    setSubmitError("");
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Please select a category";
    if (!priority) newErrors.priority = "Please select a priority";
    if (!deadline) newErrors.deadline = "Please select a deadline";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const categoryValue = getCategoryValue(category);
    const selectedLocation = getLocationOptions().find(
      (loc) => loc.value === location,
    );

    // Convert date string (YYYY-MM-DD) to ISO 8601 format for the API
    const deadlineISO = new Date(`${deadline}T12:00:00.000Z`).toISOString();

    try {
      await createTask.mutateAsync({
        title,
        description,
        category: categoryValue,
        priority: priority.toUpperCase() as "LOW" | "MEDIUM" | "HIGH",
        deadline: deadlineISO,
        latitude: selectedLocation?.latitude || 31.5,
        longitude: selectedLocation?.longitude || 34.4667,
        images: image ? [image] : undefined,
      });
      resetForm();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to create task:", error);
      let userMessage =
        "An error occurred while posting the task. Please try again.";

      if (error) {
        const errorMessage = error?.message || "";
        const errorData = error?.errors?.[0]?.message || "";

        if (
          errorMessage.includes("not enough") ||
          errorData.includes("not enough") ||
          errorMessage.includes("balance") ||
          errorData.includes("balance") ||
          errorMessage.includes("insufficient") ||
          errorData.includes("insufficient")
        ) {
          userMessage =
            "You don't have enough points to post this task. Please top up your balance.";
        } else if (errorMessage) {
          userMessage = errorMessage;
        }
      }

      setSubmitError(userMessage);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
    setLocation("");
    setDeadline("");
    setImage(null);
    setErrors({});
    setSubmitError("");
  };

  const userName = currentUser?.name || "User";
  const rawAvatar = currentUser?.assets?.[0]?.url || currentUser?.avatar || "";
  const userAvatar = rawAvatar === "null" ? "" : rawAvatar;

  return (
    <div className="fixed inset-0 z-200 bg-black/40 flex justify-center items-end sm:items-center p-0 sm:py-2 sm:px-4">
      <div className="bg-white w-full sm:max-w-105 md:max-w-120 lg:max-w-135 xl:max-w-160 2xl:max-w-180 max-h-[95vh] sm:max-h-[94vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-[#DFDFDF] shadow-xl scrollbar-hide">
        <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-4 p-3.5 sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={userAvatar || userDefaultImg}
                className="w-8 h-8 rounded-full object-cover"
                alt={userName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = userDefaultImg;
                }}
              />
              <div>
                <p className="font-semibold text-sm text-text-primary leading-tight">
                  {userName}
                </p>
                <p className="text-text-secondary text-xs leading-tight">
                  Palestine, Gaza city
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="text-text-secondary" size={16} />
            </button>
          </div>

          {/* Error Banner */}
          {submitError && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="flex-1 text-xs sm:text-sm text-red-700">
                {submitError}
              </p>
              <button onClick={() => setSubmitError("")} className="shrink-0">
                <X size={14} className="text-red-400 hover:text-red-600" />
              </button>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border-b-2 bg-transparent pb-1.5 text-sm outline-none transition-colors ${
                errors.title
                  ? "border-state-error"
                  : "border-gray-200 focus:border-brand-purple"
              }`}
              placeholder="e.g. I need help in..."
            />
            {errors.title && (
              <p className="text-state-error text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border-b-2 bg-transparent pb-1 h-14 sm:h-16 lg:h-18 resize-none text-sm outline-none transition-colors ${
                errors.description
                  ? "border-state-error"
                  : "border-gray-200 focus:border-brand-purple"
              }`}
              placeholder="Describe your task and find helpers"
            />
            {errors.description && (
              <p className="text-state-error text-[10px] sm:text-xs mt-0.5">
                {errors.description}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer text-brand-purple hover:text-purple-700 transition-colors font-medium">
              <ImagePlus size={16} />
              <span className="text-sm">
                {image ? "Change Image" : "Upload Image"}
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
            {image && (
              <div className="relative mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  className="rounded-xl h-32 sm:h-40 w-full object-cover"
                  alt="Task"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 xl:gap-x-6 xl:gap-y-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
                Category
              </label>
              <div className="relative flex items-center">
                <Rabbit
                  size={16}
                  className="text-brand-purple absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full rounded-full pl-9 pr-3 py-2 border text-sm appearance-none bg-white cursor-pointer transition-colors ${
                    errors.category
                      ? "border-state-error"
                      : "border-gray-200 focus:border-brand-purple"
                  }`}
                >
                  <option value="">Select Category</option>
                  {apiCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-state-error text-xs mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
                priority
              </label>
              <div className="relative flex items-center">
                <Flame
                  size={16}
                  className="text-brand-purple absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`w-full rounded-full pl-9 pr-3 py-2 border text-sm appearance-none bg-white cursor-pointer transition-colors ${
                    errors.priority
                      ? "border-state-error"
                      : "border-gray-200 focus:border-brand-purple"
                  }`}
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              {errors.priority && (
                <p className="text-state-error text-xs mt-1">
                  {errors.priority}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin
                  size={16}
                  className="text-brand-purple absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-full pl-9 pr-3 py-2 border border-gray-200 text-sm appearance-none bg-white cursor-pointer focus:border-brand-purple transition-colors"
                >
                  <option value="">Select Location</option>
                  <optgroup label="Palestine">
                    {getLocationOptions()
                      .slice(0, 10)
                      .map((loc) => (
                        <option key={loc.value} value={loc.value}>
                          {loc.label}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Other">
                    {getLocationOptions()
                      .slice(10)
                      .map((loc) => (
                        <option key={loc.value} value={loc.value}>
                          {loc.label}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1">
                deadline
              </label>
              <div className="relative flex items-center">
                <Calendar
                  size={16}
                  className="text-brand-purple absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`w-full rounded-full pl-9 pr-3 py-2 border text-sm bg-white cursor-pointer transition-colors ${
                    errors.deadline
                      ? "border-state-error"
                      : "border-gray-200 focus:border-brand-purple"
                  }`}
                />
              </div>
              {errors.deadline && (
                <p className="text-state-error text-xs mt-1">
                  {errors.deadline}
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-purple-50/60 rounded-xl p-2.5">
            <h3 className="font-semibold text-[11px] sm:text-xs mb-0.5 text-text-primary">
              Important Instructions Before Posting
            </h3>
            <div className="text-text-secondary space-y-0 text-[10px] sm:text-xs leading-normal">
              <p>
                • Points:{" "}
                <span className="font-semibold text-brand-purple">
                  5 points
                </span>{" "}
                will be deducted once the task is completed, based on the task
                details.
              </p>
              <p>
                • Accurate Information: Make sure all details (category,
                priority, and location) are correct to avoid confusion.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 justify-center mt-1">
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="flex-1 sm:flex-none sm:min-w-32 lg:min-w-40 py-1.5 sm:py-2 rounded-full border border-brand-purple text-brand-purple text-xs sm:text-sm font-semibold hover:bg-purple-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={createTask.isPending}
              className="flex-1 sm:flex-none sm:min-w-32 lg:min-w-40 py-1.5 sm:py-2 rounded-full bg-brand-purple text-white flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              {createTask.isPending ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <Check size={16} />
              )}
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
