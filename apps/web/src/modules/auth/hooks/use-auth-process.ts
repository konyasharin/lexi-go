import { useMemo, useState } from "react";

import { GetTokensAwaited } from "@/modules/auth";

import { useIsFirstRenderThrowState } from "@/shared/hooks";

interface UseAuthProcessParams {
  loadings: [...boolean[]];
  isSetJwt: boolean;
  jwt: GetTokensAwaited;
}

export const useAuthProcess = (params: UseAuthProcessParams) => {
  const [inProcessInfluence, setInProcessInfluence] = useState<boolean>(false);
  const isFirstRender = useIsFirstRenderThrowState();

  const inProcess = useMemo(() => {
    return !!(
      params.loadings.some((loading) => loading) ||
      (!params.jwt.accessToken && params.jwt.refreshToken) ||
      (params.jwt.accessToken && params.jwt.refreshToken && !params.isSetJwt) ||
      inProcessInfluence ||
      (isFirstRender && !params.isSetJwt)
    );
  }, [params, inProcessInfluence, isFirstRender]);

  return {
    inProcess,
    setInProcessInfluence,
  };
};
