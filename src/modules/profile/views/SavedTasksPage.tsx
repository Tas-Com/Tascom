import { SavedTaskCard } from "../components/SavedTaskCard";
import { mockSavedTasks } from "../data/mockSavedTasks";
import noSavedIcon from "@/assets/icons/noSavedIcon.png";

const SavedTasksPage = () => {
    // TODO: Replace with real API call
    const savedTasks = mockSavedTasks;
    const isEmpty = savedTasks.length === 0;

    return (
        <div className="flex flex-col gap-6 w-full max-w-[970px]">
            <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] tracking-normal text-(--colors-Text-primary,#251455)">
                Saved Tasks
            </h1>

            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <img
                        src={noSavedIcon}
                        alt="No saved tasks"
                        className="w-24 h-24 object-contain"
                    />
                    <p className="font-[Poppins] font-semibold text-[20px] leading-[1.2] text-center text-(--colors-Text-primary,#251455)">
                        No saved tasks yet.
                    </p>
                    <p className="font-[Poppins] font-normal text-[18px] leading-[1.4] text-center text-(--colors-Text-Secondary,#6E6E6E)">
                        You haven't saved any tasks yet.
                        <br />
                        Save tasks to easily find and review them later.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {savedTasks.map((task) => (
                        <SavedTaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedTasksPage;
