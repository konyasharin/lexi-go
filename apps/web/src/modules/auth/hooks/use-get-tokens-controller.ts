import { useQuery } from "@tanstack/react-query";

import { AuthApi } from "../api";

export const useGetTokensController = () => {
  return useQuery({
    queryKey: [],
    queryFn: AuthApi.getTokens.bind(AuthApi),
    enabled: false,
  });
};
