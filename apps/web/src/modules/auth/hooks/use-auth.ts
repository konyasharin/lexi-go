import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import jwtUtils from "jsonwebtoken";
import { useRouter } from "next/navigation";

import { APP_PATHS } from "@/modules/routing";
import { useTRPC } from "@/modules/trpc";

import { HEAD_START_REFRESH_TIME } from "../constants";
import { GetTokensAwaited, jwtSchema, UserSchemaInfer } from "../types";

import { useDeleteTokensController } from "./use-delete-tokens-controller";
import { useGetTokensController } from "./use-get-tokens-controller";

export const useAuth = (jwt: GetTokensAwaited) => {
  const router = useRouter();
  const trpc = useTRPC();
  const refreshController = useMutation(trpc.auth.refresh.mutationOptions());
  const getTokensController = useGetTokensController();
  const deleteTokensController = useDeleteTokensController();
  const [currentJwt, setCurrentJwt] = useState<GetTokensAwaited>(jwt);

  const getDataFromToken = (token: string) => {
    const decodedToken = jwtSchema.safeParse(jwtUtils.decode(token));
    if (decodedToken.success) return decodedToken.data;

    console.error(decodedToken.error);
    return null;
  };

  const refresh = (refreshToken: string) => {
    if (!refreshController.isPending) refreshController.mutate(refreshToken);
  };

  const createRefreshTimeout = (endTime: number, refreshToken: string) => {
    return setTimeout(
      () => {
        refresh(refreshToken);
      },
      endTime * 1000 - new Date().getTime() - HEAD_START_REFRESH_TIME,
    );
  };

  const routerPushOnCookieUpdate = (pathname: string) => {
    // Cookies apply only after reload, so you must use router.refresh()
    router.push(pathname);
    router.refresh();
  };

  const tokenData = useMemo(() => {
    if (!currentJwt.accessToken) {
      if (currentJwt.refreshToken) refresh(currentJwt.refreshToken.value);
      return null;
    }
    const newTokenData = getDataFromToken(currentJwt.accessToken.value);
    if (newTokenData && currentJwt.refreshToken)
      createRefreshTimeout(newTokenData.exp, currentJwt.refreshToken.value);

    return newTokenData;
  }, [currentJwt]);

  const user = useMemo<UserSchemaInfer | null>(() => {
    if (!tokenData) return null;
    return {
      id: tokenData.id,
      email: tokenData.email,
    };
  }, [tokenData]);

  const updateTokenData = async () => {
    try {
      const tokens = (await getTokensController.refetch()).data?.data.tokens;
      if (!tokens) return;

      routerPushOnCookieUpdate(APP_PATHS.MAIN);
      setCurrentJwt(tokens);
    } catch (error) {
      console.error(error);
      router.push(APP_PATHS.SIGN_IN);
    }
  };

  const logout = async () => {
    await deleteTokensController.mutate();
    setCurrentJwt({ accessToken: undefined, refreshToken: undefined });

    routerPushOnCookieUpdate(APP_PATHS.SIGN_IN);
  };

  useEffect(() => {
    if (refreshController.isSuccess) updateTokenData();
  }, [refreshController.isSuccess]);

  return {
    tokenData,
    updateTokenData,
    user,
    logout,
    isLoading: refreshController.isPending || getTokensController.isLoading,
  };
};
