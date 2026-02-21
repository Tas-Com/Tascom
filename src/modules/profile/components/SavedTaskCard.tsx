import { Link } from "@tanstack/react-router";
import { Star, Bookmark } from "lucide-react";

export interface SavedTask {
    id: string;
    taskerName: string;
    taskerImage: string;
    rating: number;
    postedTime: string;
    taskTitle: string;
    description: string;
    imageUrl: string;
}

interface SavedTaskCardProps {
    task: SavedTask;
}

export function SavedTaskCard({ task }: SavedTaskCardProps) {
    return (
        <div
            className="flex gap-6 w-full rounded-2xl p-4 border border-(--colors-border-post-border,#F1F0F0) bg-white"
            style={{ minHeight: 255, maxHeight: 255 }}
        >
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    <img
                        src={task.taskerImage}
                        alt={task.taskerName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-[Poppins] font-semibold text-sm text-[#251455]">
                                {task.taskerName}
                            </span>
                            <span className="flex items-center gap-0.5 text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-amber-500 font-medium">
                                    {task.rating}
                                </span>
                            </span>
                        </div>
                        <span className="text-xs text-[#6E6E6E]">{task.postedTime}</span>
                    </div>
                    <div className="ml-auto">
                        <Bookmark className="w-5 h-5 fill-[#251455] text-[#251455]" />
                    </div>
                </div>

                <div className="flex gap-4 flex-1 min-h-0">
                    <img
                        src={task.imageUrl}
                        alt={task.taskTitle}
                        className="w-[160px] h-[150px] rounded-xl object-cover shrink-0"
                    />
                    <div className="flex flex-col justify-between min-w-0 flex-1">
                        <div>
                            <h3 className="font-[Poppins] font-semibold text-base text-[#251455] mb-1 truncate">
                                {task.taskTitle}
                            </h3>
                            <p className="font-[Poppins] text-sm text-[#6E6E6E] leading-relaxed line-clamp-4">
                                {task.description}
                            </p>
                        </div>
                        <Link
                            to="/tasks/$taskId"
                            params={{ taskId: task.id }}
                            className="self-end text-sm font-[Poppins] font-medium text-(--colors-brand-Purple,#6B39F4) hover:underline mt-2"
                        >
                            See more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
