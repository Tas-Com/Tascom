/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type PropsWithChildren } from 'react';
import type { AuthRepo } from './repository/AuthRepo';
import { restAuth } from './repository/restAuth';

const AuthContext = createContext<AuthRepo | null>(null);

type AuthProviderProps = PropsWithChildren<{
  value: AuthRepo;
}>;

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export const createAuthModule = () => {
  const value = restAuth();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <AuthProvider value={value}>{children}</AuthProvider>
    ),
  };
};
