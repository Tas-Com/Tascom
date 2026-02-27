import { useQuery } from "@tanstack/react-query";
import { restDashboard } from "../repository/restDashboard";

const dashboardRepo = restDashboard();

export const useMyTasks = () => {
    return useQuery({
        queryKey: ["my-tasks"],
        queryFn: () => dashboardRepo.getMyTasks(),
    });
};

export const useMyClaims = () => {
    return useQuery({
        queryKey: ["my-claims"],
        queryFn: () => dashboardRepo.getMyClaims(),
    });
};
