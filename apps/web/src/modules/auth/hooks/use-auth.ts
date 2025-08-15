import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import jwtUtils from "jsonwebtoken";
import { useRouter } from "next/navigation";

import { GetTokensAwaited, userSchema, UserSchemaInfer } from "../types";

import { APP_PATHS } from "@/shared/constants";

export const useAuth = (jwt: GetTokensAwaited) => {
  const getUserFromToken = (token: string) => {
    const decodedUser = userSchema.safeParse(jwtUtils.decode(token));
    if (decodedUser.success) return decodedUser.data;

    console.error(decodedUser.error);
    return null;
  };

  const [user, setUser] = useState<UserSchemaInfer | null>(() => {
    if (jwt.accessToken) return getUserFromToken(jwt.accessToken.value);
    return null;
  });
  const router = useRouter();

  const updateUser = async () => {
    try {
      const response = await axios.get<
        never,
        AxiosResponse<{ tokens: GetTokensAwaited }>
      >(`${process.env.NEXT_PUBLIC_HOST!}/api/tokens`);
      const tokens = response.data.tokens;
      if (tokens.accessToken)
        setUser(getUserFromToken(tokens.accessToken.value));
    } catch (error) {
      console.error(error);
      router.push(APP_PATHS.SIGN_IN);
    }
  };

  return {
    user,
    updateUser,
  };
};
