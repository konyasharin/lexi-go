"use client";

import { createContext, FC, ReactNode } from "react";

import { GetTokensAwaited } from "@/modules/auth";

import { useAuth, useAuthProcess, useGoogleAuth } from "../hooks";

interface AuthContextProviderProps extends GetTokensAwaited {
  children?: ReactNode;
}

interface AuthContext {
  auth: ReturnType<typeof useAuth>;
  googleAuth: ReturnType<typeof useGoogleAuth>;
  authProcess: ReturnType<typeof useAuthProcess>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
  ...jwt
}) => {
  const auth = useAuth(jwt);
  const googleAuth = useGoogleAuth(auth);
  const authProcess = useAuthProcess({
    loadings: [auth.isLoading, googleAuth.isLoading],
    isSetJwt: !!auth.user,
    jwt,
  });

  return (
    <AuthContext.Provider value={{ auth, googleAuth, authProcess }}>
      {children}
    </AuthContext.Provider>
  );
};
