"use client";

import { createContext, FC, ReactNode } from "react";

import { GetTokensAwaited } from "@/modules/auth";

import { useAuth } from "../hooks";

interface AuthContextProviderProps extends GetTokensAwaited {
  children?: ReactNode;
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
  ...jwt
}) => {
  const auth = useAuth(jwt);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
