const RequestsPage = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-[970px]">
            <h1 className="font-[Poppins] font-semibold text-[36px] leading-[1.2] text-(--colors-Text-primary,#251455)">
                Requests
            </h1>
            <div className="bg-white rounded-[16px] p-8 shadow-sm text-center py-20">
                <p className="text-xl font-medium text-(--colors-Text-primary,#251455)">
                    No requests found.
                </p>
                <p className="text-gray-500 mt-2">
                    Placeholder for your service requests and inquiries.
                </p>
            </div>
        </div>
    );
};

export default RequestsPage;
