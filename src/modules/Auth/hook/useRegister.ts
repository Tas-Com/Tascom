import { useMutation } from '@tanstack/react-query';
import { useAuth } from '..';
import type { AuthRequest } from '../dto/AuthDto';
import { queryClient } from '../../../main';

export const AuthKey = 'Auth';

export const useRegister = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: (request: AuthRequest) => auth.register(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
};
