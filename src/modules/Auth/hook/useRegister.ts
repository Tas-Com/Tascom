import { useMutation } from '@tanstack/react-query';
import { useAuth } from '..';
import type { AuthRequest } from '../dto/AuthDto';
import { queryClient } from '../../../main';
import { tokenManager } from '../../../shared/api/client';

export const AuthKey = 'Auth';

export const useRegister = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: (request: AuthRequest) => auth.register(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
      tokenManager.setToken(data.access_token);
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
};
