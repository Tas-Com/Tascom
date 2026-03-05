import { useQuery } from "@tanstack/react-query";

import type { User } from "@/modules/Auth/dto/AuthDto";
import { restUsers } from "../repository/restUsers";
import { tokenManager } from "@/shared/api/client";

const usersRepo = restUsers();

export const CURRENT_USER_KEY = "currentUser";

export const useCurrentUser = () => {
  const userId = tokenManager.getUserId();

  return useQuery<User>({
    queryKey: [CURRENT_USER_KEY, userId],
    queryFn: () => usersRepo.getById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useUserById = (id: string | null | undefined) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => usersRepo.getById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

