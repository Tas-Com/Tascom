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
            className="flex gap-6 w-full rounded-2xl p-4 border border-border-post bg-white"
            style={{ minHeight: 255, maxHeight: 255 }}
        >
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    {task.taskerImage ? (
                        <img
                            src={task.taskerImage}
                            alt={task.taskerName}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://i.pravatar.cc/40";
                            }}
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">{task.taskerName.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-[Poppins] font-semibold text-sm text-text-primary">
                                {task.taskerName}
                            </span>
                            <span className="flex items-center gap-0.5 text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-amber-500 font-medium">
                                    {task.rating}
                                </span>
                            </span>
                        </div>
                        <span className="text-xs text-text-secondary">{task.postedTime}</span>
                    </div>
                    <div className="ml-auto">
                        <Bookmark className="w-5 h-5 fill-icon-default text-icon-default" />
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
                            <h3 className="font-[Poppins] font-semibold text-base text-text-primary mb-1 truncate">
                                {task.taskTitle}
                            </h3>
                            <p className="font-[Poppins] text-sm text-text-secondary leading-relaxed line-clamp-4">
                                {task.description}
                            </p>
                        </div>
                        <Link
                            to="/tasks/$taskId"
                            params={{ taskId: task.id }}
                            className="self-end text-sm font-[Poppins] font-medium text-brand-purple hover:underline mt-2"
                        >
                            See more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
