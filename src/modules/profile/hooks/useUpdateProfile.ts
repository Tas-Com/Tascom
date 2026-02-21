import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restUsers } from "../repository/restUsers";
import { tokenManager } from "@/shared/api/client";
import { CURRENT_USER_KEY } from "./useCurrentUser";

const usersRepo = restUsers();

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const userId = tokenManager.getUserId();

    return useMutation({
        mutationFn: (data: FormData) => {
            if (!userId) throw new Error("User ID not found");
            return usersRepo.updateUser(userId, data);
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData([CURRENT_USER_KEY, userId], updatedUser);
        },
    });
};
