import { useState } from "react";
import { X, Pencil, ImagePlus, Check, Rabbit, Flame, MapPin, Calendar, Trash2 } from "lucide-react";

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostTaskModal({ isOpen, onClose }: PostTaskModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handlePost = () => {
    const newErrors: any = {};
    if (!title) newErrors.title = true;
    if (!description) newErrors.description = true;
    if (!category) newErrors.category = true;
    if (!priority) newErrors.priority = true;
    if (!location) newErrors.location = true;
    if (!deadline) newErrors.deadline = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log({ title, description, category, priority, location, deadline, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="bg-bg-secondary w-[600px] max-h-[max-content] rounded-2xl p-5 relative shadow-lg">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-body-s1">Ahmad Mahdi</p>
              <p className="text-caption1 text-text-secondary">Palestine, Gaza city</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="text-text-secondary" />
          </button>
        </div>

        <div className="mb-3">
          <label className="text-label1">Task Title</label>
          <div className="relative">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full rounded-full px-4 py-2 border ${
                errors.title ? "border-state-error" : "border-border-default"
              }`}
              placeholder="e.g. I need help in..."
            />
            <Pencil className="absolute right-3 top-2.5 text-text-secondary" size={16} />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-label1">Description</label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full rounded-xl px-4 py-2 border h-20 resize-none ${
                errors.description ? "border-state-error" : "border-border-default"
              }`}
              placeholder="Describe your task and find helpers"
            />
            <Pencil className="absolute right-3 top-2.5 text-text-secondary" size={16} />
          </div>
        </div>

        <div className="mb-3">
          <label className="flex items-center gap-2 text-caption1 cursor-pointer">
            <ImagePlus size={16} />
            {image ? "Change Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
          {image && (
            <div className="relative mt-2">
              <img src={URL.createObjectURL(image)} className="rounded-xl h-32 w-full object-cover" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-label1">Category</label>
            <div className="relative flex items-center">
              <Rabbit size={18} className="text-purple-600 absolute left-3 top-2.5" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full rounded-full px-10 py-2 border ${
                  errors.category ? "border-state-error" : "border-border-default"
                }`}
              >
                <option value="">Select Category</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-label1">Priority</label>
            <div className="relative flex items-center">
              <Flame size={18} className="text-purple-600 absolute left-3 top-2.5" />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full rounded-full px-10 py-2 border ${
                  errors.priority ? "border-state-error" : "border-border-default"
                }`}
              >
                <option value="">Select Priority</option>
                <option value="High">High Priority</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-label1">Location</label>
            <div className="relative flex items-center">
              <MapPin size={18} className="text-purple-600 absolute left-3 top-2.5" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full rounded-full px-10 py-2 border ${
                  errors.location ? "border-state-error" : "border-border-default"
                }`}
              >
                <option value="">Select Location</option>
                <option value="New city , 3 street">New city , 3 street</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-label1">Deadline</label>
            <div className="relative flex items-center">
              <Calendar size={18} className="text-purple-600 absolute left-3 top-2.5" />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`w-full rounded-full px-10 py-2 border ${
                  errors.deadline ? "border-state-error" : "border-border-default"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold mb-1 text-sm">Important Instructions Before Posting</h3>
          <div className="text-caption1 text-text-secondary space-y-1 text-xs">
            <p>• Points: <span className="text-brand-purple">5 points</span> will be deducted once the task is completed, based on the task details.</p>
            <p>• Accurate Information: Make sure all details (category, priority, and location) are correct to avoid confusion and attract the right helper.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mb-2">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-full border border-brand-purple text-brand-purple"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-10 py-2 rounded-full bg-brand-purple text-white flex items-center gap-2"
          >
            <Check size={16} />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
