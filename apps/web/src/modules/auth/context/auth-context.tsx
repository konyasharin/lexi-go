'use client';

import { createContext, FC, ReactNode } from 'react';

import { useAuth } from '../hooks';

interface AuthContextProviderProps {
  children?: ReactNode;
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export const AuthContextProvider: FC<AuthContextProviderProps> = props => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
