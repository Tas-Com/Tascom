import { useCurrentUser } from "../hooks/useCurrentUser";

const PointsBalancePage = () => {
    const { data: currentUser } = useCurrentUser();

    return (
        <div className="flex flex-col gap-6 w-full max-w-[970px]">
            <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] text-(--colors-Text-primary,#251455)">
                Points Balance
            </h1>
            <div className="bg-white rounded-[16px] p-8 shadow-sm">
                <p className="text-lg text-(--colors-Text-primary,#251455)">
                    Your current balance: <span className="font-bold text-brand-purple">{currentUser?.pointsBalance || 0} Points</span>
                </p>
                <p className="text-gray-500 mt-2">
                    Placeholder for points history and transactions.
                </p>
            </div>
        </div>
    );
};

export default PointsBalancePage;
