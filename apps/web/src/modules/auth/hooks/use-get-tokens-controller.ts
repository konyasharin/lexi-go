import { useQuery } from "@tanstack/react-query";

import { AuthApi } from "@/modules/auth/api";

export const useGetTokensController = () => {
  return useQuery({
    queryKey: [],
    queryFn: AuthApi.getTokens,
    enabled: false,
  });
};
