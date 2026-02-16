import { useMutation } from '@tanstack/react-query';
import { useAuth } from '..';
import type { AuthRequest } from '../dto/AuthDto';
import { AuthKey } from './useRegister';
import { queryClient } from '../../../main';
import { tokenManager } from '../../../shared/api/client';

export const useLogin = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: (request: AuthRequest) => auth.login(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
      tokenManager.setToken(data.access_token);
      tokenManager.setUserId(String(data.id));
    },
    onError: (error) => console.log(error),
  });
};
