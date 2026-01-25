import { useMutation } from '@tanstack/react-query';
import { useAuth } from '..';
import type { AuthRequest } from '../dto/AuthDto';
import { AuthKey } from './useRegister';
import { queryClient } from '../../../main';

export const useLogin = (request: AuthRequest) => {
  const auth = useAuth();
  return useMutation({
    mutationFn: () => auth.login(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
};
